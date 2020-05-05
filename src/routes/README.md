## Table of available routes

| Path                     | Container             | Connected |
| ------------------------ | --------------------- | --------- |
| /                        | Home                  | false     |
| /inscription             | Signup                | false     |
| /demande/liste/:status?  | demande               | true      |
| /demande/ajouter         | demande/add           | true      |
| /demande/modifier/:id    | demande/edit          | true      |
| /mes-informations        | profile               | true      |
| /change-password         | forms/changePassword' | true      |
| /reset-password          | /forms/resetPassword  | false     |
| /specialites/liste       | specialites/index     | true      |
| /specialites/ajouter     | specialites/add       | true      |
| /specialite/modifier/:id | specialites/edit      | true      |
| /referentiels/liste      | /referentiels         | true      |
| /referentiels/ajouter    | referentiels/add      | true      |
| /unite-regionale/liste   | /uniteRegionale       | true      |
| /unite-regionale/ajouter | /uniteRegionale/add   | true      |
| /archive                 | /archive              | true      |
| \*                       | /NotFoundPage         | false     |

```sh
Warning
notFoundPage should be always the last route any route after notFoundPage will be ignored
```
