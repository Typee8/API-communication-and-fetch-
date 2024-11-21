
![API communication and fetch()](./README-assets/project-img.png)
# Travel Agency Site (JavaScript)

It's the conclusion of **9th chapter** (there's **20**) of [devmentor.pl](https://devmentor.pl/mentoring-javascript) mentoring program.

## How to check it out:

1. fetch the project.
2. clone it on your pc.
3. **Make sure you're in the root directory!**
4. use ***npm install*** to install the required packages.
5. use ***npm run jsonServer*** to enable the app access server's data.
6. use ***npm run start*** to launch the project.
7. in your url add new (or change index.html) path segment: admin.html to access admin panel.

---

## :memo: Tasks:

#### 1) Create 2 panels: User and Admin.

:man_technologist: **User Capabilities:**

- Add Tickets to the Basket
- View Basket Contents: User can view the products in the basket, including individual prices, the number of tickets, and the total price.
- Remove Products: User can remove products from the basket.
- Enter Personal Information: User can input name and email address.
- Place Order: User can place an order, which will be saved on the server along with name and email.

**Admin Capabilities:**
- Add New Excursions: Admins can add new excursions, specifying the name, ticket price, and description.
- Edit Excursions
- Remove Excursions

#### 2) Write ExcursionsAPI.js:
- Server Communication: Enables seamless communication with the server (json-server).
- Add, Edit, Remove Excursions: Allows adding, editing, and removing excursions on the server.
- Load Excursions: Enables loading excursions from the server for display.

#### 3) Write Validation of:
- Tickets: Confirm that the ticket's input value is type of number. Prevent users from adding an excessive number of tickets to the basket.
- User Name: Verify that the user name has only letters and eventually whitespaces.
- Email: Confirm that user's email includes '@'.
- Basket Limit Enforcement: Impose an overall limit on the number of tickets that can be added to the basket.

---

## :mortar_board: Acquired skills:

:white_check_mark: Server API Communication: Used the Fetch API ***fetch()*** to interact with server-side APIs. <br>
:white_check_mark: HTML Webpack Plugin: Used to connect JS files with created HTML files. <br>
:white_check_mark: Webpack Configuration: Configured Webpack to correctly process and bundle CSS files. <br>
:white_check_mark: HTML Prototypes: Utilized prototypes from HTML for easier use in JS. <br>

#### CSS Skills:
:white_check_mark: CSS Variables: Simplify font size adjustments (in ./src/css/admin/fonts.css) <br>
:white_check_mark: Responsive Web Design (**RWD**): Created responsive design to ensure optimal user experience across various devices. <br>
:white_check_mark: Separation of Concerns (**SoC**): Implemented separate CSS files for different viewports to enhance maintainability and manageability. <br>

#### JSON-Server:

:white_check_mark: Acquired proficiency in utilizing **json-server** for rapid front-end development, particularly beneficial in scenarios where a backend team haven't prepared an API yet. <br>
