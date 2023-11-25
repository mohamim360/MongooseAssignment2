
### Project: assignment-2-mongoose

#### Description:
This project is built with Node.js, Express, and MongoDB using Mongoose. It provides a basic server with CRUD operations.


#### Installation:
1. Clone the repository:
   ```bash
   git clone https://github.com/mohamim360/MongooseAssignment2.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   
#### Configuration:
1. Create a `.env` file in the root of the project.
2. Add the following configurations to the `.env` file:
   ```env
   PORT=5000
   DB_URL=mongodb+srv://your-username:your-password@cluster0.your-mongodb.net/your-database?retryWrites=true&w=majority
   ```
   Replace `your-username`, `your-password`, and `your-database` with your MongoDB Atlas credentials.

#### Running the Application:
- For development (with hot-reloading using ts-node-dev):
   ```bash
   npm run start:dev
   ```
   The server will be running at `http://localhost:5000`.

- For production (after building TypeScript files):
   ```bash
   npm run build
   npm run start:prod
   ```
   The server will be running at `http://localhost:5000`.

