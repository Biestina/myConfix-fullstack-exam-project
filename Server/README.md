#
# 📎 Asztali számítógép-összeállító alkalmazás

Az myConfix egy asztali PC konfigurátor, amivel saját igényeinknek megfelelően állíthatjuk össze leendő számítógépünket. 
Felhasználóként regisztrációt követően egyedi számítógép-konfigurációkat állíthatunk össze a rendelkezésre álló hardverlista alapján. A kész összeállításokat elmenthetjük a fiókjukba, illetve megtekinthetjük, szerkeszthetjük és törölhetjük is őket.
<!-- A többi hasonló konfigurátorral szemben itt regisztráció után be tudjuk állítani a meglévő hardvereinket, és a fennmaradó komponenseket ez alapján szűrve kapjuk meg, valamint egy súgóban megjelennek a hardverhez kapcsolódó legtipikusabb kompatibilitási hibalehetőségek.  -->
<!-- Admin jogosultsággal hozzáférünk az hardver adatbázis elemeihez, tudunk új elemeket hozzáadni, és szükség esetén szerkeszteni, vagy törölni tudjuk őket. -->



<!-- ___
--- -->
📎
# 📎 Technikai háttér


#### **Kliens**: Angular 
#### **Stílus, reszponzivitás**: SCSS, Bootstrap
#### **Szerver**: Express.js, Node.js API
#### **Adatbázis**: MongoDB, NoSQL
#### **Autorizáció**: JSONWebToken
#### **Tesztkörnyezet**: JEST
#### **Dokumentáció**: Swagger
#### **Konténerizáció**: Docker

<!-- ---
--- -->
📎
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

<!-- # -->
📎
#  User story lista, feladatok

A felhasználó regisztrál és belép az alkalmazásba

- Regisztrációs képernyő megvalósítása
- **POST /users** regisztrációs végpont implementálása
- Login képernyő megvalósítása
- **POST /login** végpont implementálása 
- JWT autentikáció implementáció, kliens oldali hozzáférés szabályozása autentikáció alapján

A felhasználó összeállít egy PC konfigurációt

- Builder képernyő implementálása
- **GET /hardwares** végpont implementálása az összeállításhoz szükséges alkatrészek lekérdezéséhez
- **POST /configs** végpont implementálása a konfiguráció véglegesítéséhez

A felhasználó megtekinti a mentett összeállításait

- Aktuális konfigurációk képernyő implementálása
- **GET /users/configs** végpont implementálása (felhasználó összeállításainak lekérdezése)

📎
# 📎 Képernyők

## Sign up

A felhasználó létrehozhatja a felhasználói fiókját, e-mail, jelszó, és felhasználónév megadásával.

## Login

A felhasználó bejelentkezhet e-mail cím és jelszó megadásával.

## Hardwares

A felhasználó táblázatos formában látja az adatbázisban szereplő hardvereket. A kiválasztott hardverhez tartozó "More info" gomb megnyomásával egy felugró ablakban láthatóak a hardver további tulajdonságai.

## Builder - Konfigurátor űrlap

A képernyő bal oldalán látható az összeállító űrlap. Minden alkatrész-kategóriához tartozik egy legördülő menü, amiben a felhasználó az ahhoz tartozó komponensek közül kiválaszthatja, melyiket szeretné beépíteni a konfigurációjába. Kategóriánként egy hardver választható. A képernyő jobb oldalán listázásra kerülnek a kiválasztott hardverek, de még nem mentődik el a lista. A "Save config" gombra kattintva elmentjük az összeállítást, majd a **My Configs** képernyőre jutunk. (Csak belépés után érhető el.)

## My Configs - Aktuális konfigurációk listája

A bejelentkezett felhasználó látja kész összeállításait kártyák formájában. A kiválasztott összeállítás kártya-elemén található "Update" gomb megnyomásakor az alkalmazás átnavigál a konkrét konfiguráció szerkesztési felületére, ahol lehetősége van szerkeszteni, illetve törölni azt. Az "Update" véglegesítése után a felhasználó visszajut a **My Configs** képernyőre.


📎
# 📎 API végpontok

| HTTP kérés | API végpont         |    Leírás            |
| :-------- | :----------- | :------------------------- |
| `GET` | /hardwares | Hardverek lekérdezése
| `**POST` | /hardwares | Új hardver létrehozása
| `**PUT` | /hardwares/:id | Hardver adatok szerkesztése
| `**DELETE` | /hardwares/:id | Hardver törlése
| `GET` | /configs | Konfigurációk lekérdezése
| `POST` | /configs | Konfiguráció létrehozása
| `GET` | /configs/:id | Adott konfiguráció lekérdezése
| `PUT` | /configs/:id | Konfiguráció szerkesztése
| `DELETE` | /configs/:id | Konfiguráció törlése
| `GET` | /users | Felhasználók lekérdezése
| `**GET` | /users/:id | Adott felhasználó lekérdezése
| `POST` | /users | Felhasználói regisztráció
| `POST` | /login | Felhasználói bejelentkezés
| `POST` | /refresh | Munkamenet frissítése
| `POST` | /logout | Felhasználói kijelentkezés
| `GET` | /me | Felhasználó azonosítása

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
