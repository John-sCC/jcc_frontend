---
title: 'Automatically Populate Github Issues'
layout: post
description : Automatically Populated Github Issue
---

Function to automatically convert github issues to markdown files and add them to blog. Heres is an example of the code. 
Initially this was successful, but I wanted to automatically run this code on build, which means I need to commit the hidden key to github which automatically deletes the key. I'm working on using AWS Secrets Manager to fix this issue. 
```Python
import requests
from datetime import datetime
import math

def generate_markdown_file(issue_data, file_path):
    """
    Generate a Markdown file for a GitHub issue.
    
    Args:
        issue_data (dict): Dictionary containing issue data.
        file_path (str): Path to save the Markdown file.
    """
    with open(file_path, 'w', encoding='utf-8') as file:

        # Write front matter
        file.write('---\n')
        file.write(f"title: '{issue_data['title']}'\n")
        file.write('layout: post\n')  # Adjust layout as needed
        
        file.write('tags: [github, issue]\n')  # Add relevant tags
        file.write("courses: {ToC: {week: " + str(issue_data['week']) + "}}\n")
        file.write("type : plans\n")
        file.write("description : Automatically Populated Github Issue\n")
        file.write('---\n\n')
        
        # Write issue body
        file.write(issue_data['body'] + '\n\n')
        
        # Write comments if available
        if 'comments' in issue_data:
            file.write('## Comments\n\n')
            for comment in issue_data['comments']:
                file.write(f"**{comment['user']['login']}**: {comment['body']}\n\n")


# Generate Markdown file
# generate_markdown_file(issue_data, '_posts/sample_issue.md')

def get_github_repository_issues(owner, repo_name, token=None):
    # Construct the GraphQL query
    query = """
    query {
      repository(owner: "%s", name: "%s") {
        issues(first: 100) {
          nodes {
            title
            url
            body
            createdAt
            closedAt
            state
            author {
              login
            }
          }
        }
      }
    }
    """ % (owner, repo_name)

    # Define headers
    headers = {
        "Authorization": f"Bearer {token}" if token else None,
        "Content-Type": "application/json",
    }

    # Make the request
    response = requests.post(
        "https://api.github.com/graphql",
        json={"query": query},
        headers=headers
    )

    # Check for successful response
    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to fetch data:", response.text)
        return None

def create_issues():
  owner = "John-scc"
  repo_name = "jcc_frontend"
  token = "My Token(Not gonna put it on the internet)" 
  
  issues_data = get_github_repository_issues(owner, "jcc_frontend")["data"]["repository"]["issues"]["nodes"] + get_github_repository_issues(owner, "jcc_backend")["data"]["repository"]["issues"]["nodes"]

  date1 = datetime(2023, 8, 21)
  for issue in issues_data:
      year, month, day = map(int, issue["createdAt"][:10].split("-"))
      date2 = datetime(year,month,day)
      difference = date2 - date1
      week = difference.days/7
      issue_data = {
          'title': issue["title"],
          'body': issue["body"],
          'created_at': issue["createdAt"][:10],
          'week': math.floor(week - 3)
      }
      generate_markdown_file(issue_data, f"_posts/{issue['createdAt'][:10]}-{issue['title'].replace(' ', '-').replace('/', ' ')}.md")

if __name__ == "__main__":
    create_issues()
```

I'm planning on automatically running through these two methods:

```Make
default: server
	@echo "Terminal logging starting, watching server..."
	@# tail and awk work together to extract Jekyll regeneration messages
	@# When a _notebook is detected in the log, call make convert in the background
	@# Note: We use the "if ($$0 ~ /_notebooks\/.*\.ipynb/) { system(\"make convert &\") }" to call make convert
	@(tail -f $(LOG_FILE) | awk '/Server address: http:\/\/0.0.0.0:$(PORT)\/$(REPO_NAME)\// { serverReady=1 } \
	serverReady && /^ *Regenerating:/ { regenerate=1 } \
	regenerate { \
		if (/^[[:blank:]]*$$/) { regenerate=0 } \
		else { \
			print; \
			if ($$0 ~ /_notebooks\/.*\.ipynb/) { system("make convert &") } \
		} \
	}') 2>/dev/null &
	@# start an infinite loop with timeout to check log status
	@python -c 'import sys; from scripts.pull_issues import create_issues; create_issues()' "$<"
	@for ((COUNTER = 0; ; COUNTER++)); do \
		if grep -q "Server address:" $(LOG_FILE); then \
			echo "Server started in $$COUNTER seconds"; \
			break; \
		fi; \
		if [ $$COUNTER -eq 60 ]; then \
			echo "Server timed out after $$COUNTER seconds."; \
			echo "Review errors from $(LOG_FILE)."; \
			cat $(LOG_FILE); \
			exit 1; \
		fi; \
		sleep 1; \
	done
	@# outputs startup log, removes last line ($$d) as ctl-c message is not applicable for background process
	@sed '$$d' $(LOG_FILE)
```

Here you can see we use the @python -c 'import sys; from scripts.pull_issues import create_issues; create_issues()' "$<" runs our python file, where the @ means it doesn't echo it to the console, the python runs the python interpreter and then we give it a line of python to run. We do something similar in the jekyll-gh-pages.yml file where we run:

```Yaml
jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Install dependencies
        run: |
          pip install nbconvert
          # Add any other necessary package installations here
      - name: Execute conversion script
        run: python scripts/convert_notebooks.py
      - name: Execute Issues Script
        run: python scripts/pull_issues.py
      - name: Build with Jekyll
        uses: actions/jekyll-build-pages@v1
        with:
          source: ./
          destination: ./_site
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
```
The run: python scripts/pull_issues.py tells the jekyll builder to run our python script and automatically populate the issues. 

