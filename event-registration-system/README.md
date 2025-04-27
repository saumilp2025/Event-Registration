# Event Registration System

## Objective / Vision
Develop a lightweight application for managing event registrations, allowing users to view event details and register online.

## Users of the System
- **End Users**: Individuals interested in registering for events.
- **Event Organizers**: Administrators who create and manage events.

## Functional Requirements
- Display a list of upcoming events.
- Event detail page with descriptions, dates, and location.
- User registration for events.
- Email confirmation upon successful registration.
- Admin functionality to add, edit, and delete events.
- Limit the number of registrants based on event capacity.
- Allow users to cancel or modify their registration.
- Search functionality to find specific events.

## Non-Functional Requirements
- Simple and easy-to-use interface.
- 99.5% uptime assurance.
- Support up to 1,000 concurrent users.
- Registration confirmation emails sent within 1 minute.

## Optional Features
- Export registration data as CSV.
- Waitlist management for full events.
- Integration with Google Calendar for event reminders.

## User Interface Priorities
- Simple, intuitive design.
- Responsive layout for mobile and desktop.

## Reports
- Registration summary per event.
- List of registered users with contact details.

## Other Important Issues
- Data privacy and secure storage.
- Scalability for future growth.

## Team Size
- 1 Member

## Technologies to be Used
- **Frontend**: HTML/CSS/JavaScript or React.js
- **Backend**: Node.js with Express
- **Database**: AWS DynamoDB
- **Email Service**: Amazon SES
- **Hosting**: Amazon S3 (static assets), AWS Lambda (backend)

## Tools to be Used
- **Deployment**: AWS CodePipeline
- **Version Control**: GitHub
- **Monitoring**: AWS CloudWatch

## Final Deliverables
- Working event registration system hosted on AWS.
- Code repository with documentation.
- Deployment instructions.
- Basic admin panel for event management.