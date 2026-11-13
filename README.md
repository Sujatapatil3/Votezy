# Votezy – Online Voting Application

Votezy is a web-based Online Voting Application developed using Java, Spring Boot, and MySQL. It allows election administrators to manage voters, candidates, voting activities, and election results through a simple web interface.

## Features

- Voter Registration and Management
- Candidate Registration and Management
- Cast Vote functionality
- One Vote Per Voter validation
- Voter Eligibility Status
- Election Result Declaration
- Automatic Winner Calculation
- Live Dashboard Statistics
- Responsive Web Interface

## Tech Stack

**Backend**
- Java 21
- Spring Boot 3.5.16
- Spring Data JPA
- Hibernate
- Maven
- Lombok

**Frontend**
- HTML5
- CSS3
- JavaScript
- Fetch API

**Database**
- MySQL 8

**Tools**
- Eclipse / Spring Tools Suite
- MySQL Workbench
- Postman
- Git and GitHub

## Project Structure

```text
Votezy/
├── src/
│   ├── main/
│   │   ├── java/in/skalive/votezy/
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── entity/
│   │   │   ├── exception/
│   │   │   ├── repository/
│   │   │   └── service/
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   │           ├── css/
│   │           ├── js/
│   │           └── *.html
│   └── test/
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md
```

## API Endpoints

| Module | Method | Endpoint |
|---|---|---|
| Voter | POST | `/api/voters/register` |
| Voter | GET | `/api/voters/` |
| Voter | GET | `/api/voters/{id}` |
| Voter | PUT | `/api/voters/update/{id}` |
| Voter | DELETE | `/api/voters/delete/{id}` |
| Candidate | POST | `/api/candidate/add` |
| Candidate | GET | `/api/candidate/` |
| Candidate | GET | `/api/candidate/{id}` |
| Candidate | PUT | `/api/candidate/update/{id}` |
| Candidate | DELETE | `/api/candidate/delete/{id}` |
| Voting | POST | `/api/votes/cast` |
| Voting | GET | `/api/votes/` |
| Results | POST | `/api/election-result/declare` |
| Results | GET | `/api/election-result/` |

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Sujatapatil3/Votezy.git
```

### 2. Open the Project

Import the cloned project into Eclipse or Spring Tools Suite as an existing Maven project.

### 3. Create MySQL Database

```sql
CREATE DATABASE votezy_db;
```

### 4. Configure Environment Variables

Set the following Windows environment variables:

- `VOTEZY_DB_USERNAME`
- `VOTEZY_DB_PASSWORD`

Configure `src/main/resources/application.properties` to read these variables.

### 5. Run the Application

Run `VotezyApplication.java` as a Spring Boot application.

Alternatively, use:

```bash
mvnw.cmd spring-boot:run
```

### 6. Open the Application

Visit:

```text
http://localhost:8080/
```

## Architecture

The application follows a layered architecture:

**Controller → Service → Repository → MySQL Database**

The frontend communicates with backend REST APIs using JavaScript Fetch API.

## Future Enhancements

- Authentication and authorization
- Admin and voter roles
- Improved ballot secrecy
- Pagination for voter and candidate lists
- Cloud deployment

## Author

**Sujata Jitendra Patil**

GitHub: [Sujatapatil3](https://github.com/Sujatapatil3)

Project Repository: [Votezy](https://github.com/Sujatapatil3/Votezy)
