#
# 📎 Asztali számítógép-összeállító alkalmazás

Az myConfix egy asztali PC konfigurátor, amivel saját igényeinknek megfelelően állíthatjuk össze leendő számítógépünket. 
Felhasználóként regisztrációt követően egyedi számítógép-konfigurációkat állíthatunk össze a rendelkezésre álló hardverlista alapján. A kész összeállításokat elmenthetjük a fiókjukba, illetve megtekinthetjük, szerkeszthetjük és törölhetjük is.
<!-- A többi hasonló konfigurátorral szemben itt regisztráció után be tudjuk állítani a meglévő hardvereinket, és a fennmaradó komponenseket ez alapján szűrve kapjuk meg, valamint egy súgóban megjelennek a hardverhez kapcsolódó legtipikusabb kompatibilitási hibalehetőségek.  -->
<!-- Admin jogosultsággal hozzáférünk az hardver adatbázis elemeihez, tudunk új elemeket hozzáadni, és szükség esetén szerkeszteni, vagy törölni tudjuk őket. -->


#
<!-- ___
--- -->

#  📎 Technikai háttér


#### **Kliens**: Angular 
#### **Stílus, reszponzivitás**: SCSS, Bootstrap
#### **Szerver**: Express.js, Node.js API
#### **Adatbázis**: MongoDB, NoSQL
#### **Tesztkörnyezet**: JEST
#### **Dokumentáció**: Swagger
#### **Konténerizáció**: Docker

<!-- ---
--- -->
#
# 📎 Entitások

## **User**

Egy felhasználó, aki különböző gépösszeállításokat menthet, illetve módosíthat a regisztrált fiókjában, valamint böngészhet a hardverek között.
Tárolásra kerül az e-mail címe, felhasználóneve, jelszava, és a jogosultsági szerepköre.

## **Config**

Egy számítógép-összeállítás, amelyet felhasználóként kezelhetünk, amennyiben rendelkezünk regisztrációval és felhasználói jogosultságokkal. Rendelkezik névvel, felhasználó-hivatkozással és alkatrészekkel (CPU, RAM, PSU stb.).

## **Hardware**

Egy számítógép-alkatrész, ami az oldal nyilvános hardverlistájának elemeként jelenik meg.
Az alkalmazás 8-féle hardvertípust különböztet meg kategória alapján.
(Gépház, Processzor, Videókártya, Alaplap, Monitor, Memória, Tápegység, Háttértár).
Ezek alapján tudunk egyedi konfigurációt beállítani.

#
# 📎 User story lista, feladatok

A felhasználó regisztrál és belép az alkalmazásba

- Regisztrációs képernyő megvalósítása
- API regisztrációs végpont implementálása (POST /register)
- Login képernyő megvalósítása
- API login végpont implementálása (POST /login)
- JWT autentikáció implementáció, kliens oldali hozzáférés szabályozása autentikáció alapján

A felhasználó jegyet vásárol

- Jegy kiválasztása képernyő implementálása
- GET /tickets végpont implementálása a megvásárolható jegyek lekérdezéséhez
- Jegy checkout képernyő implementálása
- POST /tickets végpont implementálása a vásárlás véglegesítéséhez

A felhasználó megtekinti a megvásárolt jegyeit

- Aktuális jegyek képernyő implementálása
- GET /users/tickets végpont implementálása (felhasználó jegyeinek lekérdezése)
#
# 📎 Képernyők

## Regisztráció

A felhasználó létrehozhatja a felhasználói fiókját, e-mail, jelszó, név, életkor és lakcím megadásával.

## Login

A felhasználó bejelentkezhet e-mail cím és jelszó megadásával.

## Aktuális jegyek

A felhasználó táblázatos formában látja, miből mennyi jeggyel rendelkezik, és látja, hogy az adott jegyekkel milyen járművekre szállhat fel. A vásárlás gomb megnyomásával a **Jegyvásárlás – jegy kiválasztása** képernyőre jutunk. Csak belépés után érhető el.

## Jegyvásárlás – jegy kiválasztása

A felhasználó egy listából kiválaszthatja, milyen jegyet szeretne vásárolni. Többet is vásárolhat egy típusból egyszerre, és több típust is vásárolhat. Az oldalon látható a kiválasztott jegyek összege, illetve az, hogy melyik jegy milyen járműre érvényes. A tovább gombra kattintva a **Jegyvásárlás – checkout** képernyőre jutunk. Csak belépés után érhető el.

## Jegyvásárlás – checkout

A felhasználó lát egy összesítést a megvásárolandó jegyekről, illetve azok áráról. A kész gomb megnyomásakor lesz végleges a vásárlás, a felhasználó visszajut az **Aktuális jegyek** képernyőre. Csak belépés után érhető el.
#
# 📎 API végpontok

| HTTP kérés | API végpont         |    Leírás            |
| :-------- | :----------- | :------------------------- |
| `GET` | /hardwares | Hardverek lekérdezése
| `POST` | /hardwares | Új hardver létrehozása
| `GET` | /hardwares/id | Adott hardver lekérdezése
| `PUT` | /hardwares/id | Hardver adatok szerkesztése
| `DELETE` | /hardwares/id | Hardver törlése
| `GET` | /configs | Konfigurációk lekérdezése
| `POST` | /configs | Konfiguráció létrehozása
| `GET` | /configs/id | Adott konfiguráció lekérdezése
| `PUT` | /configs/id | Konfiguráció szerkesztése
| `DELETE` | /configs/id | Konfiguráció törlése
| `GET` | /users | Felhasználók lekérdezése
| `POST` | /users | Felhasználói regisztráció
  Login........

<!-- Hardverek
GET/hardwares
POST/hardwares
GET/hardwares/{_id}
PUT/hardwares/{_id}
DELETE/hardwares/{_id}
Konfigurációk
GET/configs
POST/configs
GET/configs/{_id}
PUT/configs/{_id}
DELETE/configs/{_id}
Felhasználók
GET/users
POST/users
GET/users/{_id}
PUT/users/{_id}
DELETE/users/{_id} -->
