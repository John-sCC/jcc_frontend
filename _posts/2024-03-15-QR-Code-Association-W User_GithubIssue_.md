---
title: 'QR Code Association W/User'
layout: post
description : Automatically Populated Github Issue
---

- [ ] Use a detailsservice file to associate this with user
- [ ] update frontend to allow searching through existing qr codes

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

