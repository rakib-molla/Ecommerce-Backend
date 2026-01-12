Prerequisites:
Node.js 
MongoDB
Redis Server


Installation Guide: 
cd your-project-name
npm install
redis-server run
npm run dev


Folder Structure:
src/
 ├── config/             # Database & Redis configurations
 ├── controllers/        # Business logic for routes
 ├── middlewares/        # Security, Auth & Error handlers
 ├── models/             # Mongoose schemas
 ├── routes/             # Express routes
 ├── utils/              # ApiResponse, ErrorHandler & Helpers
 ├── app.js              # App configurations
 └── server.js           # Server entry point


Testing the API
API Response Format
Success:
{
  "success": true,
  "statusCode": 200,
  "message": "Success message",
  "data": { ... }
}


Error:
{
  "success": false,
  "statusCode": 404,
  "message": "Error message",
  "data": null
}


<!-- seeder run command  -->
node src/seeders/user.seeder.js