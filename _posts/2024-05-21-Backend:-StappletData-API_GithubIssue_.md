---
title: 'Backend: StappletData API'
layout: post
description : Automatically Populated Github Issue
---

- [ ] Create unified data object (each type [catagorical/quantitative] should be inherited by this)
- [ ] Associate StappletData to user using detailsService file
- [ ] Finish functional api controllers
- [ ] Integrate api to frontend

```Java
public void addQrCodeToUser(String personEmail, Long qrCodeId) { 
    Person person = personJpaRepository.findByEmail(personEmail);
        if (person != null) {   // verify person
            Optional<QrCode> qrCode = QrCodeJpaRepository.findById(qrCodeId);
            if (qrCode != null) { // verify role
                person.getQrCodes().add(qrCode.get());
            }
        }
    }
```

```Java
@GetMapping("/getQuantitative{id}")
public ResponseEntity<Quantitative> getQuantitative(@PathVariable long id) {
        Optional<Quantitative> optional = qRepository.findById(id);
        if (optional.isPresent()) {  // Good ID
            Quantitative quantitative = optional.get();  // value from findByID
            return new ResponseEntity<>(quantitative, HttpStatus.OK);  // OK HTTP response: status code, headers, and body
        }
        // Bad ID
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);       
    }
```

