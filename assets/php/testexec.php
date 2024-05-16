<?php
$path = {{ site.baseurl }}
$files = scandir($path);

foreach($files as $file) {
     if($file != '.' && $file != '..') {
        echo '<div><a href="readfile.php?file='.urlencode($file).'"> '.$file.'</a></div>';
     }
}

?>