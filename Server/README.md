#
# 📎 Asztali számítógép-összeállító alkalmazás

Az myConfix egy asztali PC konfigurátor, amivel saját igényeinknek megfelelően állíthatjuk össze leendő számítógépünket. 
Felhasználóként regisztrációt követően egyedi számítógép-konfigurációkat állíthatunk össze a rendelkezésre álló hardverlista alapján. A kész összeállításokat elmenthetjük a fiókjukba, illetve megtekinthetjük, szerkeszthetjük és törölhetjük is őket.

# Alkalmazás telepítése

## 0. GitHub repository klónozása

A projekt klónozásához a következő parancsot adja ki a terminálban:

```bash
git clone https://github.com/Strukturavaltas-FullstackAPI-2023/fsapi-remek-assignment-Biestina.git
```

Lépjen be a projekt gyökérkönyvtárába:

```bash
cd fsapi-remek-assignment-Biestina
```

A projekt függőségeinek telepítéséhez adja ki a következő parancsot:

```bash
cd Client\Angular && npm i && ng build && cd ../.. && npm i
```

## 1. Telepítés Docker segítségével

### 1.1. Docker telepítése

A Docker telepítéséhez kövesse a hivatalos dokumentációt: [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/) vagy [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/) vagy [Docker Desktop for Linux](https://docs.docker.com/engine/install/)
### 1.2. Docker Compose telepítése

A Docker Compose telepítéséhez kövesse a hivatalos dokumentációt: [Docker Compose](https://docs.docker.com/compose/install/)
### 1.3. Docker Compose futtatása

A Docker Compose futtatásához a projekt gyökérkönyvtárában adja ki a következő parancsot:

```bash
npm run docker-compose
```

## 2. Alkalmazás tesztelése

### 2.1. Alkalmazás megnyitása
Az alkalmazás megnyitásához a következő linket kell megnyitni a böngészőben: [http://localhost:3000/login](http://localhost:3000/login)

### 2.2. Bejelentkezés
Hozzon létre egy új felhasználót a "Sign up now!" linkre kattintva, vagy használja a következő adatokat:

```bash
email: t@ester.com
password: test
```

# 📎 Technikai háttér

#### **Kliens**: Angular 
#### **Stílus, reszponzivitás**: SCSS, Bootstrap
#### **Szerver**: Express.js, Node.js API
#### **Adatbázis**: MongoDB, NoSQL
#### **Autorizáció**: JSONWebToken
#### **Tesztkörnyezet**: JEST
#### **Dokumentáció**: Swagger
#### **Konténerizáció**: Docker

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

A felhasználó megnyitja az alkalmazást
- **GET **/api** végpont implementálása a főoldal megjelenítéséhez

A felhasználók böngészhetnek a hardverek között
- **GET /api/hardwares** végpont implementálása a hardverek lekéréséhez
- Hardverek listázása táblázatos formában

A felhasználó regisztrál és belép az alkalmazásba
- Regisztrációs képernyő megvalósítása
- **GET /api/users** végpont implementálása a létező felhasználók lekéréséhez
- **POST /api/users** regisztrációs végpont implementálása
- Login képernyő megvalósítása
- **POST /api/login** végpont implementálása 
- JWT autentikáció implementáció, kliens oldali hozzáférés szabályozása autentikáció alapján

A felhasználó összeállít egy PC konfigurációt
- Builder képernyő implementálása
- **GET /api/hardwares** végpont implementálása az összeállításhoz szükséges alkatrészek lekérdezéséhez
- **POST /api/configs/:userId/myconfigs** végpont implementálása a konfiguráció véglegesítéséhez

A felhasználó megtekinti a mentett összeállításait
- My configs képernyő implementálása
- **GET /api/configs/:userId/myconfigs/:configId** végpont implementálása (felhasználó összeállításainak lekérdezése)

A felhasználó módosítja a kiválasztott konfigurációt
- Update képernyő implementálása
- **PUT /api/configs/:userId/myconfigs/:configId** végpont implementálása a konfiguráció módosításához
- **DELETE /api/configs/:userId/myconfigs/:configId** végpont implementálása a konfiguráció törléséhez
- My configs képernyő implementálása

# 📎 Képernyők

## Sign up

A felhasználó létrehozhatja a felhasználói fiókját, e-mail és jelszó megadásával.

## Login

A felhasználó bejelentkezhet e-mail cím és jelszó megadásával.

## Hardwares

A felhasználó táblázatos formában látja az adatbázisban szereplő hardvereket. A kiválasztott hardverhez tartozó "More" gomb megnyomásával egy felugró ablakban láthatóak a hardver további tulajdonságai.

## Builder - Konfigurátor űrlap

A képernyő bal oldalán látható az összeállító űrlap. Minden alkatrész-kategóriához tartozik egy legördülő menü, amiben a felhasználó az ahhoz tartozó komponensek közül kiválaszthatja, melyiket szeretné beépíteni a konfigurációjába. Kategóriánként egy hardver választható. A képernyő jobb oldalán listázásra kerülnek a kiválasztott hardverek, de még nem mentődik el a lista. A "Build a new PC" gombra kattintva elmentjük az összeállítást, majd a **My Configs** képernyőre jutunk. (Csak belépés után érhető el.)

## My Configs - Aktuális konfigurációk listája

A bejelentkezett felhasználó látja kész összeállításait kártyák formájában. A kiválasztott összeállítás kártya-elemén található "Update" gomb megnyomásakor az alkalmazás átnavigál a konkrét konfiguráció szerkesztési felületére. (Csak belépés után érhető el.)

## Update Config - Aktuális konfiguráció frissítése

A felhasználó egy űrlap formájában látja az aktuális konfigurációját, amelyet szerkeszthet. Az "Update" gomb megnyomásával elmentődnek a változtatások, a "Delete" gombbal pedig törlődik az elem a listából. Az "Update", vagy "Delete" művelet véglegesítése után a felhasználó visszajut a **My Configs** képernyőre a módosított listájához.


# 📎 API végpontok

| HTTP kérés | API végpont         |    Leírás            |
| :-------- | :----------- | :------------------------- |
| `GET` |api/hardwares | Hardverek lekérdezése
| `GET` |api/hardwares/:id | Adott hardver lekérdezése
| `GET` |api/configs/:userId/myconfigs | Konfigurációk lekérdezése
| `POST` |api/configs/:userId/myconfigs | Konfiguráció létrehozása
| `GET` |api/configs/:userId/myconfigs/:configId | Adott konfiguráció lekérdezése
| `PUT` |api/configs/:userId/myconfigs:configId | Konfiguráció szerkesztése
| `DELETE` |api/configs/:userId/myconfigs/:configId | Konfiguráció törlése
| `GET` |api/users | Felhasználók lekérdezése
| `POST` |api/users | Felhasználói regisztráció
| `GET` |api/users/:id | Adott felhasználó lekérdezése
| `POST` |api/login | Felhasználói bejelentkezés
| `POST` |api/logout | Felhasználói kijelentkezés
| `GET` |api/me | Felhasználó azonosítása
| `POST` |api/refresh | Munkamenet frissítése
