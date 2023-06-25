const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Student = require('./models/student.model');
const Teacher = require('./models/teacher.model');
const Schedule = require('./models/schedule.model');

exports.options = {
  "components": {
    "schemas": {
      User: m2s(User),
      Teacher: m2s(Teacher),
      Student: m2s(Student),
      Schedule: m2s(Schedule)
    }
  },
  "openapi": "3.0.1",
  "info": {
    "version": "1.0.0",
    "title": "School CRUD API",
    "description": "School Project Application API",
    "license": {
      "name": "MIT",
      "url": "https://opensource.org/licenses/MIT"
    }
  },
  "servers": [
    {
      url: 'http://localhost:3000/',
      description: 'Local server'
    },
    {
      url: 'https://api_url_testing',
      description: 'Testing server'
    },
  ],
  "tags": [
    {
      "name": "Users",
      "description": "API for users in the system"
    },
    {
      "name": "Students",
      "description": "API for Students in the system"
    },
    {
      "name": "Teachers",
      "description": "API for Teachers in the system"
    },
    {
      "name": "Schedule",
      "description": "API for Schedule in the system"
    }
  ],
  "consumes": ["application/json"],
  "produces": ["application/json"],
  "paths":{
    "/api/user/findall": {
      "get": {
        "tags": [
          "Users"
        ],
        "summary": "Get all users in system",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
          }
        }
      }
    },
    "/api/user/getByUsername/{username}": {
      "get": {
        "tags": [
          "Users"
        ],
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "required": true,
            "description": "Username of user that we want to find",
            "type": "string"
          }
        ],
        "summary": "Get user from system with specific username",
        "responses": {
          "200": {
            "description": "User find",
            "schema": {
              "$ref": "#/components/schemas/user"
            }
          }
        }
      }
    },
    "/api/user/getById/{id}": {
      "get": {
        "tags": [
          "Users"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "description": "ID of user that we want to find",
            "type": "string"
          }
        ],
        "summary": "Get user from system with specific id",
        "responses": {
          "200": {
            "description": "User find",
            "schema": {
              "$ref": "#/components/schemas/user"
            }
          }
        }
      }
    },
    "/api/user/create": {
      "post": {
        "tags": [
          "Users"
        ],
        "description": "Create new user in system",
        "summary": "Create new user in system",
        "requestBody": {
          "description": "User that we want to create",
          "content": {
            "application/x-www-form-urlencoded": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "password": { "type": "string" }, 
                  "firstname": { "type": "string" },
                  "lastname": { "type": "string" },
                  "email": { "type": "string" },
                },
                "required": ["username", "password", "firstname", "lastname", "email"]
              },
            }
          }, 
        },
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "New user is created",
          },
          "400": {
            "description": "Error in creating user",
          }
        }
      } 
    },
    "/api/user/update": {
      "patch": {
        "tags": [
          "Users"
        ],
        "description": "Update user in system",
        "summary": "Update user in system",
        "requestBody": {
          "description": "User that we will update",
          "content": {
            "application/x-www-form-urlencoded": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "role": { "type": "string" }, 
                  "category": { "type": "string" }, 
                  "firstname": { "type": "string" },
                  "lastname": { "type": "string" },
                  "email": { "type": "string" },
                },
                // "required": ["username", "role", "category", "firstname", "lastname", "email"]
              },
            }
          }, 
        },
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Update a user",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
          }
        }
      } 
    },
    "/api/user/deleteByUsername/{username}": {
      "delete": {
        "tags": [
          "Users"
        ],
        "description": "Delete user in system by username",
        "summary": "Delete user in system by username",
        "parameters": [{
            "name": "username",
            "in": "path",
            "description": "User that we want to delete",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
        }],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Delete a user by username",
          }
        }
      } 
    },
    "/api/user/deleteById/{id}": {
      "delete": {
        "tags": [
          "Users"
        ],
        "description": "Delete user in system by id",
        "summary": "Delete user in system by id",
        "parameters": [{
            "name": "id",
            "in": "path",
            "description": "User that we want to delete",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
        }],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Delete a user by id",
          }
        }
      } 
    },
    "/api/student/findall": {
      "get": {
        "tags": [
          "Students"
        ],
        "summary": "Get all Students in system",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/components/schemas/Student"
            }
          }
        }
      }
    },
    "/api/student/getByUsername/{username}": {
      "get": {
        "tags": [
          "Students"
        ],
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "required": true,
            "description": "Username of student that we want to find",
            "type": "string"
          }
        ],
        "summary": "Get student from system with specific username",
        "responses": {
          "200": {
            "description": "Student find",
            "schema": {
              "$ref": "#/components/schemas/student"
            }
          }
        }
      }
    },
    "/api/student/getById/{id}": {
      "get": {
        "tags": [
          "Students"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "description": "ID of student that we want to find",
            "type": "string"
          }
        ],
        "summary": "Get student from system with specific id",
        "responses": {
          "200": {
            "description": "Student find",
            "schema": {
              "$ref": "#/components/schemas/student"
            }
          }
        }
      }
    },
    "/api/student/create": {
      "post": {
        "tags": [
          "Students"
        ],
        "description": "Create new student in system",
        "summary": "Create new student in system",
        "requestBody": {
          "description": "Student that we want to create",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "password": { "type": "string" }, 
                  "firstname": { "type": "string" },
                  "lastname": { "type": "string" },
                  "email": { "type": "string" },
                  "group": { "type": "string" },
                  "address": {
                    "type": "object",
                    "properties": {
                      "area": { "type": "string" },
                      "road": { "type": "string" }
                    },
                  },
                  "phone":{
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "type": { "type": "string" },
                        "number": { "type": "number" }
                      }
                    }
                  }
                },
                "required": ["username", "password", "firstname", "lastname", "email"]
              },
            }
          }, 
        },
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "New user is created",
          },
          "400": {
            "description": "Error in creating user",
          }
        }
      } 
    },
    "/api/student/update": {
      "patch": {
        "tags": [
          "Students"
        ],
        "description": "Update student in system",
        "summary": "Update student in system",
        "requestBody": {
          "description": "Student that we will update",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "role": { "type": "string" }, 
                  "category": { "type": "string" },
                  "firstname": { "type": "string" },
                  "lastname": { "type": "string" },
                  "email": { "type": "string" },
                  "group": { "type": "string" },
                  "address": {
                    "type": "object",
                    "properties": {
                      "area": { "type": "string" },
                      "road": { "type": "string" }
                    },
                  },
                  "phone":{
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "type": { "type": "string" },
                        "number": { "type": "number" }
                      }
                    }
                  }
                },
                // "required": ["username", "role", "category", "firstname", "lastname", "email"]
              },
            }
          }, 
        },
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Update a student",
            "schema": {
              "$ref": "#/components/schemas/Student"
            }
          }
        }
      } 
    },
    "/api/student/deleteByUsername/{username}": {
      "delete": {
        "tags": [
          "Students"
        ],
        "description": "Delete student in system by username",
        "summary": "Delete student in system by username",
        "parameters": [{
            "name": "username",
            "in": "path",
            "description": "Student that we want to delete",
            "schema": {
              "$ref": "#/components/schemas/Student"
            }
        }],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Delete a student by username",
          }
        }
      } 
    },
    "/api/student/deleteById/{id}": {
      "delete": {
        "tags": [
          "Students"
        ],
        "description": "Delete student in system by id",
        "summary": "Delete student in system by id",
        "parameters": [{
            "name": "id",
            "in": "path",
            "description": "Student that we want to delete",
            "schema": {
              "$ref": "#/components/schemas/Student"
            }
        }],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Delete a Student by id",
          }
        }
      } 
    },
    "/api/teacher/findall": {
      "get": {
        "tags": [
          "Teachers"
        ],
        "summary": "Get all teachers in system",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/components/schemas/Teacher"
            }
          }
        }
      }
    },
    "/api/teacher/getByUsername/{username}": {
      "get": {
        "tags": [
          "Teachers"
        ],
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "required": true,
            "description": "Username of teacher that we want to find",
            "type": "string"
          }
        ],
        "summary": "Get teacher from system with specific username",
        "responses": {
          "200": {
            "description": "Teacher find",
            "schema": {
              "$ref": "#/components/schemas/Teacher"
            }
          }
        }
      }
    },
    "/api/teacher/getById/{id}": {
      "get": {
        "tags": [
          "Teachers"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "description": "ID of teacher that we want to find",
            "type": "string"
          }
        ],
        "summary": "Get teacher from system with specific id",
        "responses": {
          "200": {
            "description": "Teacher find",
            "schema": {
              "$ref": "#/components/schemas/Teacher"
            }
          }
        }
      }
    },
    "/api/teacher/create": {
      "post": {
        "tags": [
          "Teachers"
        ],
        "description": "Create new teacher in system",
        "summary": "Create new teacher in system",
        "requestBody": {
          "description": "Teacher that we want to create",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "password": { "type": "string" }, 
                  "firstname": { "type": "string" },
                  "lastname": { "type": "string" },
                  "email": { "type": "string" },
                  "group": { "type": "string" },
                  "address": {
                    "type": "object",
                    "properties": {
                      "area": { "type": "string" },
                      "road": { "type": "string" }
                    },
                  },
                  "phone":{
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "type": { "type": "string" },
                        "number": { "type": "number" }
                      }
                    }
                  }
                },
                "required": ["username", "password", "firstname", "lastname", "email"]
              },
            }
          }, 
        },
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "New user is created",
          },
          "400": {
            "description": "Error in creating user",
          }
        }
      } 
    },
    "/api/teacher/update": {
      "patch": {
        "tags": [
          "Teachers"
        ],
        "description": "Update teacher in system",
        "summary": "Update teacher in system",
        "requestBody": {
          "description": "Teacher that we will update",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "role": { "type": "string" },
                  "category": { "type": "string" }, 
                  "firstname": { "type": "string" },
                  "lastname": { "type": "string" },
                  "email": { "type": "string" },
                  "group": { "type": "string" },
                  "address": {
                    "type": "object",
                    "properties": {
                      "area": { "type": "string" },
                      "road": { "type": "string" }
                    },
                  },
                  "phone":{
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "type": { "type": "string" },
                        "number": { "type": "number" }
                      }
                    }
                  }
                },
                // "required": ["username", "role", "category", "firstname", "lastname", "email"]
              },
            }
          }, 
        },
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Update a student",
            "schema": {
              "$ref": "#/components/schemas/Teacher"
            }
          }
        }
      } 
    },
    "/api/teacher/deleteByUsername/{username}": {
      "delete": {
        "tags": [
          "Teachers"
        ],
        "description": "Delete teacher in system by username",
        "summary": "Delete teacher in system by username",
        "parameters": [{
            "name": "username",
            "in": "path",
            "description": "Teacher that we want to delete",
            "schema": {
              "$ref": "#/components/schemas/Student"
            }
        }],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Delete a teacher by username",
          }
        }
      } 
    },
    "/api/teacher/deleteById/{id}": {
      "delete": {
        "tags": [
          "Teachers"
        ],
        "description": "Delete teacher in system by id",
        "summary": "Delete teacher in system by id",
        "parameters": [{
            "name": "id",
            "in": "path",
            "description": "Teacher that we want to delete",
            "schema": {
              "$ref": "#/components/schemas/Teacher"
            }
        }],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Delete a teacher by id",
          }
        }
      } 
    },
    "/api/schedule/findall": {
      "get": {
        "tags": [
          "Schedule"
        ],
        "summary": "Get all Schedules in system",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/components/schemas/Schedule"
            }
          }
        }
      }
    },
    "/api/schedule/findOne/{dayOfWeek}/{teacher}/{group}": {
      "get": {
        "tags": [
          "Schedule"
        ],
        "parameters": [
          {
            "name": "dayOfWeek",
            "in": "path",
            "required": true,
            "description": "Day Of Week of specific class",
            "type": "string"
          },
          {
            "name": "teacher",
            "in": "path",
            "required": true,
            "description": "Teacher that we want to find",
            "type": "string"
          },
          {
            "name": "group",
            "in": "path",
            "required": true,
            "description": "Group of class that we want to find",
            "type": "string"
          }
        ],
        "summary": "Get specific class from system",
        "responses": {
          "200": {
            "description": "Teacher find",
            "schema": {
              "$ref": "#/components/schemas/Schedule"
            }
          }
        }
      }
    },
    "/api/schedule/create": {
      "post": {
        "tags": [
          "Schedule"
        ],
        "description": "Create new Schedule in system",
        "summary": "Create new Schedule in system",
        "requestBody": {
          "description": "Schedule that we want to create",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "day_of_week": { "type": "integer" },
                  "start_time": { "type": "string" }, 
                  "finish_time": { "type": "string" },
                  "lesson": { "type": "string" },
                  "group": { "type": "string" },
                  "classroom": { "type": "string" },
                  "teacher": { "type": "string" },
                  "students":{
                    "type": "array",
                    "items": {
                      "username": { "type": "string" }
                    }
                  }
                },
                "required": ["day_of_week", "start_time", "finish_time", "lesson", "group", "classroom", "teacher"]
              },
            }
          }, 
        },
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "New schedule is created",
          },
          "400": {
            "description": "Error in creating schedule",
          }
        }
      } 
    },
    "/api/schedule/update": {
      "patch": {
        "tags": [
          "Schedule"
        ],
        "description": "Update Schedule in system",
        "summary": "Update Schedule in system",
        "requestBody": {
          "description": "Schedule that we want to update",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "day_of_week": { "type": "integer" },
                  "start_time": { "type": "string" }, 
                  "finish_time": { "type": "string" },
                  "lesson": { "type": "string" },
                  "group": { "type": "string" },
                  "classroom": { "type": "string" },
                  "teacher": { "type": "string" },
                  "students":{
                    "type": "array",
                    "items": {
                      "username": { "type": "string" }
                    }
                  }
                },
                // "required": ["day_of_week", "start_time", "finish_time", "lesson", "group", "classroom", "teacher"]
              },
            }
          }, 
        },
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Schedule is updated",
          },
          "400": {
            "description": "Error in updating schedule",
          }
        }
      } 
    },
    "/api/schedule/updateByDayAndGroup": {
      "patch": {
        "tags": [
          "Schedule"
        ],
        "description": "Update Schedule By Day An Group in system",
        "summary": "Update Schedule By Day An dGroup in system",
        "requestBody": {
          "description": "Schedule By Day An dGroup that we want to update",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "day_of_week": { "type": "integer" },
                  "start_time": { "type": "string" }, 
                  "finish_time": { "type": "string" },
                  "lesson": { "type": "string" },
                  "group": { "type": "string" },
                  "classroom": { "type": "string" },
                  "teacher": { "type": "string" },
                  "students":{
                    "type": "array",
                    "items": {
                      "username": { "type": "string" }
                    }
                  }
                },
                // "required": ["day_of_week", "start_time", "finish_time", "lesson", "group", "classroom", "teacher"]
              },
            }
          }, 
        },
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Schedule is updated",
          },
          "400": {
            "description": "Error in updating schedule",
          }
        }
      } 
    },
    "/api/schedule/delete/{id}": {
      "delete": {
        "tags": [
          "Schedule"
        ],
        "description": "Delete Schedule in system by id",
        "summary": "Delete Schedule in system by id",
        "parameters": [{
            "name": "id",
            "in": "path",
            "description": "Schedule that we want to delete",
            "schema": {
              "$ref": "#/components/schemas/Schedule"
            }
        }],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Delete a Schedule by id",
          }
        }
      } 
    },
    "/api/schedule/group/{dayOfWeek}": {
      "get": {
        "tags": [
          "Schedule"
        ],
        "parameters": [
          {
            "name": "dayOfWeek",
            "in": "path",
            "required": true,
            "description": "Day to find",
            "type": "string"
          }
        ],
        "summary": "Find All Groups In Day",
        "responses": {
          "200": {
            "description": "Find All Groups In Day",
            "schema": {
              "$ref": "#/components/schemas/Schedule"
            }
          }
        }
      }
    },
    "/api/schedule/students/{group}": {
      "get": {
        "tags": [
          "Schedule"
        ],
        "parameters": [
          {
            "name": "group",
            "in": "path",
            "required": true,
            "description": "Group to find",
            "type": "string"
          }
        ],
        "summary": "Find sll students in group",
        "responses": {
          "200": {
            "description": "Find sll students in group",
            "schema": {
              "$ref": "#/components/schemas/Schedule"
            }
          }
        }
      }
    },
    "/api/schedule/lesson/{lesson}": {
      "get": {
        "tags": [
          "Schedule"
        ],
        "parameters": [
          {
            "name": "lesson",
            "in": "path",
            "required": true,
            "description": "Lesson to find",
            "type": "string"
          }
        ],
        "summary": "Find Lesson",
        "responses": {
          "200": {
            "description": "Find Lesson",
            "schema": {
              "$ref": "#/components/schemas/Schedule"
            }
          }
        }
      }
    },
    "/api/schedule/teacher-group/{teacher}/{group}": {
      "get": {
        "tags": [
          "Schedule"
        ],
        "parameters": [
          {
            "name": "teacher",
            "in": "path",
            "required": true,
            "description": "Teacher to find",
            "type": "string"
          },
          {
            "name": "group",
            "in": "path",
            "required": true,
            "description": "Group to find",
            "type": "string"
          }
        ],
        "summary": "Find Teacher and Group",
        "responses": {
          "200": {
            "description": "Find Teacher and Group",
            "schema": {
              "$ref": "#/components/schemas/Schedule"
            }
          }
        }
      }
    },
    "/api/schedule/teacher/{teacher}": {
      "get": {
        "tags": [
          "Schedule"
        ],
        "parameters": [
          {
            "name": "teacher",
            "in": "path",
            "required": true,
            "description": "Teacher to find",
            "type": "string"
          }
        ],
        "summary": "Find Schedules by Teacher",
        "responses": {
          "200": {
            "description": "Find Schedules by Teacher",
            "schema": {
              "$ref": "#/components/schemas/Schedule"
            }
          }
        }
      }
    },
    "/api/schedule/bygroup/{group}": {
      "get": {
        "tags": [
          "Schedule"
        ],
        "parameters": [
          {
            "name": "group",
            "in": "path",
            "required": true,
            "description": "Group to find",
            "type": "string"
          }
        ],
        "summary": "Find Schedules by Group",
        "responses": {
          "200": {
            "description": "Find Schedules by Group",
            "schema": {
              "$ref": "#/components/schemas/Schedule"
            }
          }
        }
      }
    }
  }
};