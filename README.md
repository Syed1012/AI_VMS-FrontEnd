# 🚗 AI VMS (Vehicle Maintenance System)

![Java](https://img.shields.io/badge/Java-11%2B-blue?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-green?style=for-the-badge&logo=springboot)
![Hibernate](https://img.shields.io/badge/Hibernate-ORM-red?style=for-the-badge&logo=hibernate)
![Maven](https://img.shields.io/badge/Maven-4.0.0-orange?style=for-the-badge&logo=apachemaven)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-blue?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Authentication-yellow?style=for-the-badge&logo=jsonwebtokens)

AI VMS (Vehicle Maintenance System) is a Java-based Spring Boot application designed to manage and track vehicle maintenance records. This system allows users to create, view, and maintain vehicle details, including servicing history, mileage, and more.

---

## 🚀 Features

- ➕ Create and track maintenance records for vehicles.
- 📝 Store vehicle details such as make, model, and registration information.
- 🛠️ Keep track of maintenance history, including dates, mileage, and types of services.
- 🌐 RESTful API for easy integration with frontend applications.
- 🛡️ Robust error handling and validation.
- 📜 JWT authentication for secure access.

---

## 🛠 Tech Stack

- **Backend:**  
  ![Java](https://img.shields.io/badge/Java-11%2B-blue?style=flat-square)  
  ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-green?style=flat-square)  
  ![Hibernate](https://img.shields.io/badge/Hibernate-ORM-red?style=flat-square)  
  ![Maven](https://img.shields.io/badge/Maven-4.0.0-orange?style=flat-square)

- **Database:**  
  Real time data integrations with MongoDB & Monitoring data through Grafana.

- **Security:**  
  ![JWT](https://img.shields.io/badge/JWT-Authentication-yellow?style=flat-square)

- **Tools:**  
  ![Postman](https://img.shields.io/badge/Postman-Testing-orange?style=flat-square)  
  ![Git](https://img.shields.io/badge/Git-VersionControl-yellow?style=flat-square)

---

## 📦 Installation

### Prerequisites

- Java 11 or higher
- Maven 4.0 or higher
- PostgreSQL/MySQL installed and configured

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/YourUsername/ai-vms.git
    ```

2. **Navigate into the project directory:**

    ```bash
    cd ai-vms
    ```

3. **Configure the database:**

    Update the `application.properties` file (in `src/main/resources`) with your database connection details:

    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/vehicle_maintenance
    spring.datasource.username=your_db_username
    spring.datasource.password=your_db_password
    spring.jpa.hibernate.ddl-auto=update
    ```

4. **Build the project:**

    ```bash
    mvn clean install
    ```

5. **Run the application:**

    ```bash
    mvn spring-boot:run
    ```

6. The application will be running at:

    ```
    http://localhost:8080
    ```

---

## 📖 Usage

### Creating a Maintenance Record

You can use the following JSON payload to create a new maintenance record for a vehicle:

```json
{
  "description": "Oil change and filter replacement",
  "maintenanceDate": "2024-10-01",
  "cost": 120.00,
  "maintenanceType": "Engine Oil",
  "mileage": 15000,
  "engineTemperature": 75.5,
  "oilLevel": 4.5,
  "vehicleUsage": "regular",
  "vehicle": {
    "id": 1
  }
}

### ❌ Error Handling
The application uses consistent error handling mechanisms. For example, if any issue occurs (e.g., a bad request), the API will respond with a structured error message.

Example error response:

```json
{
  "timestamp": "2024-10-01T15:32:35.455+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Vehicle ID is required",
  "path": "/maintenance-records"
}

### 📝 License
This project is licensed under the MIT License. See the LICENSE file for details.


