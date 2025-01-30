# 🎓 Student App

Student App is a modern API built with **Fastify**, **Drizzle ORM**, and **Neon Serverless PostgreSQL**, designed for managing students, disciplines, and enrollments. The project leverages **Zod** for data validation and follows best practices for performance, scalability, and maintainability.

## 🚀 Technologies Used

- [Fastify](https://www.fastify.io/) - A high-performance web framework for Node.js.
- [Drizzle ORM](https://orm.drizzle.team/) - A lightweight and type-safe ORM for SQL databases.
- [Neon Serverless PostgreSQL](https://neon.tech/) - A fully managed, cloud-native PostgreSQL database with serverless capabilities.
- [Zod](https://zod.dev/) - A schema validation library for TypeScript and JavaScript.
- [Dotenv](https://github.com/motdotla/dotenv) - Environment variable management.
- [Zod-to-JSON-Schema](https://github.com/StefanTerdell/zod-to-json-schema) - Converts Zod schemas to JSON Schema for Fastify validation.

## ⚡ Getting Started

### 1️⃣ Clone the repository
```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/student-app.git
cd student-app
```

### 2️⃣ Install dependencies
```sh
pnpm install
```

### 3️⃣ Configure environment variables
Create a **.env** file and add your database credentials:
```env
DATABASE_URL="your-neon-postgresql-url"
```

### 4️⃣ Run the development server
```sh
pnpm run dev
```

## 📖 API Endpoints

### 🎓 Students
- `GET /api/students` → Retrieve all students.
- `POST /api/students/create` → Create a new student.
- `PUT /api/students/update/:id` → Update student information.
- `DELETE /api/students/delete/:id` → Delete a student.

### 📚 Disciplines
- `GET /api/disciplines` → Retrieve all disciplines.
- `POST /api/disciplines/create` → Create a new discipline.
- `PUT /api/disciplines/update/:id` → Update discipline details.
- `DELETE /api/disciplines/delete/:id` → Delete a discipline.

### 📝 Enrollments
- `GET /api/enrollments` → Retrieve all enrollments.
- `POST /api/enrollments/create` → Enroll a student in a discipline.
- `PUT /api/enrollments/update/:id` → Update an enrollment.
- `DELETE /api/enrollments/delete/:id` → Remove an enrollment.

## 🏗️ Project Structure
```
student-app/
│── src/
│   ├── controllers/
│   ├── db/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   ├── server.js
│── .env
│── .gitignore
│── package.json
│── README.md
```

## 📜 License
This project is licensed under the **MIT License**.