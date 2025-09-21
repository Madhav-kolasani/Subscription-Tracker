# Subscription Management API

A production-ready backend API for managing user subscriptions with automated email reminders, built with Node.js, Express, and MongoDB.

## ✨ Features

- **🔐 User Authentication & Authorization** - JWT-based authentication with secure password hashing
- **📋 Subscription Management** - Full CRUD operations for subscription tracking
- **📧 Automated Email Reminders** - Smart reminder system using Upstash workflows (7, 5, 2, 1 days before renewal)
- **🛡️ Rate Limiting & Bot Protection** - Integrated Arcjet security for API protection
- **⚠️ Global Error Handling** - Centralized error management with consistent responses
- **🏗️ RESTful API Design** - Clean, scalable API architecture following REST conventions
- **🗄️ MongoDB Integration** - Flexible NoSQL database with Mongoose ODM and auto-indexing
- **💌 Email Notifications** - Beautiful HTML email templates with Nodemailer and Gmail SMTP
- **🔄 Auto Status Management** - Automatic subscription status updates based on renewal dates
- **🌍 Multi-Currency Support** - Support for 7 major currencies (USD, EUR, GBP, INR, JPY, AUD, CAD)
- **📊 Comprehensive Validation** - Input validation and sanitization at database level

## 🛠️ Tech Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB Atlas with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) with bcryptjs
- **Security:** Arcjet (rate limiting, bot detection, attack prevention)
- **Email Service:** Nodemailer with Gmail SMTP
- **Workflows:** Upstash Workflows for automated scheduling
- **Development:** ESLint, nodemon, dotenv

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Gmail account with app password
- Arcjet account
- Upstash account

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Madhav-kolasani/Subscription-Tracker.git
cd Subscription-Tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/subscription-tracker

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
JWT_EXPIRE=30d

# Email Configuration (Gmail SMTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Arcjet Security
ARCJET_KEY=ajkey_your_arcjet_api_key

# Upstash Workflows
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
UPSTASH_WORKFLOW_URL=https://your-workflow-url.upstash.io
UPSTASH_WORKFLOW_TOKEN=your_upstash_workflow_token
```

### 4. Database Setup
1. Create a [MongoDB Atlas](https://www.mongodb.com/atlas) account
2. Create a new cluster (free tier available)
3. Add your IP address to the whitelist
4. Create a database user
5. Copy the connection string and add it to your `.env` file

### 5. Gmail SMTP Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings → Security → App Passwords
   - Select "Mail" and generate a password
   - Use this password in the `EMAIL_PASS` environment variable

### 6. Third-Party Service Setup

#### Arcjet Security
1. Sign up at [arcjet.com](https://arcjet.com)
2. Create a new project
3. Copy the API key to your `.env` file

#### Upstash Workflows
1. Sign up at [upstash.com](https://upstash.com)
2. Create a Redis database
3. Create a workflow endpoint
4. Copy the URLs and tokens to your `.env` file

### 7. Start the Development Server
```bash
npm run dev
```

The server will start on `http://localhost:5500`

## 📚 API Endpoints

### Authentication
```
POST   /api/v1/auth/sign-up     - Register new user
POST   /api/v1/auth/sign-in     - User login
POST   /api/v1/auth/sign-out    - User logout
```


### Subscriptions
```
POST   /api/v1/subscriptions                    - Create new subscription
GET    /api/v1/subscriptions/user/:userId       - Get user's subscriptions
GET    /api/v1/subscriptions/:id                - Get subscription by ID
PUT    /api/v1/subscriptions/:id                - Update subscription
DELETE /api/v1/subscriptions/:id                - Cancel subscription
GET    /api/v1/subscriptions/renewals/upcoming  - Get upcoming renewals
```

## 🔒 Security Features

- **JWT Authentication:** Secure token-based authentication
- **Password Hashing:** bcrypt with salt rounds for password security
- **Rate Limiting:** Token bucket algorithm to prevent API abuse
- **Bot Protection:** Advanced bot detection and blocking
- **Attack Prevention:** SQL injection and common attack protection
- **Input Validation:** Comprehensive data validation with Mongoose schemas

## 📊 Database Schema

### Supported Categories
- **Entertainment** - Streaming services, gaming subscriptions
- **Sports** - Sports streaming, fitness apps
- **Lifestyle** - Fashion, food delivery, lifestyle apps  
- **Productivity** - Work tools, project management
- **Education** - Online courses, learning platforms
- **Finance** - Banking, investment, financial tools
- **Politics** - News, political content subscriptions
- **Health** - Health apps, medical subscriptions
- **Other** - Miscellaneous subscriptions

### Supported Currencies
- **USD** - US Dollar (default)
- **EUR** - Euro
- **GBP** - British Pound
- **INR** - Indian Rupee
- **JPY** - Japanese Yen
- **AUD** - Australian Dollar
- **CAD** - Canadian Dollar

### Status Types
- **Active** - Currently running subscription
- **Inactive** - Temporarily paused subscription
- **Cancelled** - User-cancelled subscription
- **Expired** - Automatically expired due to renewal date passing

## 📧 Email Reminder System

The API automatically sends beautiful HTML email reminders at:
- **7 days before renewal** - Early warning with full details
- **5 days before renewal** - Reminder with payment preparation
- **2 days before renewal** - Urgent reminder with action items
- **1 day before renewal** - Final reminder before charge

Email templates are fully customized based on:
- Reminder timing and urgency
- Subscription details (name, price, currency)
- User personalization
- Responsive HTML design

### Email Features
- **HTML Templates**: Beautiful, responsive email design
- **Smart Content**: Dynamic content based on subscription data
- **Personalization**: User name and subscription-specific details
- **Multi-Currency**: Proper currency formatting for all supported currencies
- **Gmail Integration**: Reliable delivery through Gmail SMTP

### User Model
```javascript
{
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validated: /\S+@\S+\.\S+/
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    // Hashed with bcrypt before storage
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Subscription Model
```javascript
{
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 100
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD'],
    default: 'USD'
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    required: true
  },
  category: {
    type: String,
    enum: ['entertainment', 'sports', 'lifestyle', 'productivity', 
           'education', 'finance', 'politics', 'health', 'other'],
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'cancelled', 'expired'],
    default: 'active'
  },
  startDate: {
    type: Date,
    required: true,
    // Must be in the past
  },
  renewalDate: {
    type: Date,
    // Auto-calculated if not provided
    // Must be after startDate
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
    indexed: true
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### 3. Production Environment Variables
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/subscription-prod
JWT_SECRET=your_production_jwt_secret_very_long_and_secure
# ... other production variables
```


### Using Postman
1. Import the API endpoints
2. Set up environment variables for base URL and JWT token
3. Test authentication flow first
4. Use the returned JWT token for protected routes

### Response Examples

#### Successful Subscription Creation
```json
{
  "success": true,
  "data": {
    "_id": "654321abcdef123456789012",
    "name": "Netflix Premium",
    "price": 15.99,
    "currency": "USD",
    "frequency": "monthly",
    "category": "entertainment",
    "paymentMethod": "Credit Card",
    "status": "active",
    "startDate": "2024-01-01T00:00:00.000Z",
    "renewalDate": "2024-01-31T00:00:00.000Z",
    "user": "123456789012345678901234",
    "createdAt": "2024-01-01T10:30:00.000Z",
    "updatedAt": "2024-01-01T10:30:00.000Z"
  }
}
```

#### Error Response
```json
{
  "success": false,
  "error": "Subscription name is required"
}
```

## 📝 Error Handling

The API includes comprehensive error handling for:
- Invalid MongoDB ObjectIds (404)
- Duplicate key violations (400)
- Validation errors (400)
- Authentication failures (401)
- Authorization failures (403)
- Rate limiting (429)
- Internal server errors (500)

## 🔧 Development Scripts

```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
npm run lint     # Run ESLint for code quality
```

## 📁 Project Structure

SUBSCRIPTION-TRACKER/
├── 📁 config/
│   ├── 📄 arcjet.js                 # Arcjet security configuration
│   ├── 📄 env.js                    # Environment variables setup
│   ├── 📄 nodemailer.js             # Email service configuration
│   └── 📄 upstash.js                # Upstash workflows configuration
├── 📁 controllers/
│   ├── ⚙️ auth.controller.js        # Authentication logic (signup, signin)
│   ├── ⚙️ subscription.controller.js # CRUD operations for subscriptions
│   ├── ⚙️ user.controller.js        # User profile management
│   └── ⚙️ workflow.controller.js    # Email reminder workflows
├── 📁 database/
│   └── 📄 mongodb.js                # MongoDB connection setup
├── 📁 middlewares/
│   ├── 📄 arcjet.middleware.js      # Rate limiting & bot protection
│   ├── 📄 auth.middleware.js        # JWT token verification
│   └── 📄 error.middleware.js       # Global error handling
├── 📁 models/
│   ├── 📄 subscription.model.js     # Subscription schema & validation
│   └── 📄 user.model.js             # User schema & validation
├── 📁 routes/
│   ├── 🟢 auth.routes.js            # Authentication endpoints
│   ├── 🟢 subscription.routes.js   # Subscription CRUD endpoints
│   ├── 🟢 user.routes.js            # User management endpoints
│   └── 🟢 workflow.routes.js        # Email workflow endpoints
├── 📁 utils/
│   ├── 📄 email-template.js         # HTML email templates
│   └── 📄 send-email.js             # Email sending utility
├── 📄 .env.development.local        # Development environment variables
├── 📄 .env.production.local         # Production environment variables
├── 📄 .gitignore                    # Git ignore rules
├── 📄 app.js                        # Express app configuration
├── 📄 eslint.config.js              # ESLint configuration
├── 📄 package-lock.json             # Dependency lock file
├── 📄 package.json                  # Project dependencies & scripts
├── 📄 README.md                     # Project documentation
└── 📄 vercel.json                   # Vercel deployment configuration

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built following modern backend development best practices
- Implements production-ready security and scalability features
- Designed for real-world subscription management use cases

## 📞 Support

If you have any questions or run into issues, please open an issue on this repository.

---

**Built with ❤️ using Node.js, Express, and MongoDB**