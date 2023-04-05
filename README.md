GymGuru Application Setup
This guide will walk you through setting up the GymGuru application on your local machine for testing. Please follow the instructions carefully to ensure a smooth setup process. If you encounter any issues, feel free to contact the repository owner with the exact error message you are receiving for assistance.

Prerequisites
Git: Download Git
Node.js: Download Node.js
Expo CLI: Install Expo CLI by running npm install -g expo-cli
An AWS account: Sign up for a free AWS account
Expo mobile app on your iPhone/android: Download Expo from apple store/android store
Step 1: Clone the repository
Clone the GymGuru repository to your local machine using Git. Open your GIT command prompt or terminal and Copy this code: git clone https://github.com/Rlowery1/GymGuru_React_Native_App.git

Take note of exactly where you clone/copy all of the files and directories using the git clone command so you can find it in the next step with the command prompt using cd

Step 3: Create an IAM user in AWS

1. Sign in to your AWS Management Console. Revert to prerequisites for the link to sign up for a free aws account if you haven't done so already; don't worry about the credit card information it requires, it's all free tier
2. Navigate to the IAM console.
3. In the navigation pane, choose "Users", then "Add user".
4. Enter a username, then click next.
5. Click "Next: Permissions".
6. Choose "Attach policies directly"
7. Attach the following policies: CognitoPowerUser, adminaccess-amplify, and AdministratorAccess.
8. Click "Next" and finally "Create user".
9. Click on the username you just created that should show up under the "Users" tab.
10. Click on the "Security credentials" tab and find the "Create access key button"Click it
11. Choose "Command Line Interface" and click the box at the bottom.
12. Next, create a descriptive tag and click "Create access key"
13. Important: Download the CSV(Excel) file containing the Access key ID and Secret access key. Save this file as you will need it later to configure AWS Amplify.

Step 4: Set up Amazon Cognito

1. Sign in to your AWS Management Console.
2. Navigate to the Amazon Cognito console.
3. Click on "Create user pool".
4. Leave the default "Cognito user pool" chosen.
5. Check the "User name" and "Make user name case sensitive" box, Click "Next".
6. Leave the Password policy mode as "Cognito defaults"
7. In the "MFA and verifications" section, set the following options: Multi-factor authentication (MFA): - Optional MFA with authenticator apps
8. In the "User account recovery" section, check the "Enable self-service account recovery - Recommended" box and choose "Email only", then Click "Next".
9. In the "Self-service sign-up" section, check the "Enable self-registration" box.In the "Attribute verification and user account confirmation" section, check the "Allow Cognito to automatically send messages to verify and confirm - Recommended" box
10. Choose "Send email message, verify email address".
11. Next, check the "Keep original attribute value active when an update is pending - Recommended" box and choose "Email address", finally Click "Next"
12. In the "Email" section choose "Send email with Cognito" and Click "Next"
13. Enter a desired User pool name.
14. Choose "Public client", enter a desired App client name, and choose "Don't generate a client secret" THIS IS IMPORTANT and Click, "Next"
15. Review and make sure everything looks correct then Click "Create user pool".
16. Next, Click on the UserPool name that you just created under your "User pools" tab.
17. Click on the "App integration" tab, scroll down to the "App clients and analytics" section and click "Create app client"
18. Choose "Public client", then create a desired App client name.
19. Choose "Don't generate a client secret" *THIS IS IMPORTANT* then click "Create app client"
20. Once you Click "Create app client" you should see your "User pool ID" at the top of the page and your "Client ID" at the bottom under the "App clients and analytics" section. Take note of these ID's since we will use them later, save them in a note pad if you would like for ease of use.

Step 5: Set up AWS Lambda

1. Sign in to your AWS Management Console.
2. Navigate to the AWS Lambda console.
3. Click "Create function", and choose "Author from scratch".
4. Enter a function name, and choose Node.js as the runtime.
5. Click "Create function".
6. Choose "Author from scratch"
7. Create a desired Function name
8. Choose "Node.js 18x" or higher
9. Choose "x86_64*
10. Click "Create function"
11. Click the "Code" tab, choose "Upload from" then choose ".zip file" from the dropdown.
12. Upload the resendVerificationHandler.zip file from your local machine (the file should be in the cloned repository under /gymguru-lambdas/ directory).

Step 6: Set up API Gateway

1. Sign in to your AWS Management Console.
2. Navigate to the API Gateway console.
3. Click "Create API", choose "REST API", then "Build".
4. Select "New API", enter an API name (e.g., "resend-verification"), and click "Create API".
5. Click "Actions", then "Create Resource".
6. Enter a resource name (e.g., "resend-verification-code") and click "Create Resource".
7. Click "Actions" again, then "Create Method" and choose "POST".
8. In the "Integration type" section, choose "Lambda Function".
9. Check the "Use Lambda Proxy integration" box.
10. Select the correct region and enter the name of the Lambda function created earlier.
11. Click "Save".

Step 7: Update the configuration files

1. Locate the aws-exports.sample.js and UserPool.sample.js files in the cloned repository. *They should be in /gymguru/aws-exports.sample.js and /gymguru/src/screens/UserPool.sample.js*
2. Remove the .sample from the filenames, so they become aws-exports.js and UserPool.js. VERY IMPORTANT
3. Update the aws-exports.js and UserPool.js files with the necessary information from the AWS services created earlier, such as the Pool ID, App client ID, and region, etc.

Step 8: Install dependencies

1. First, open your command prompt by typing in cmd in your search bar and clicking on the command prompt pop up.
2. Once in the command prompt use the "cd" command to find the path where you cloned/copied the repo from github.com and "cd" into the gymguru folder/directory
3. Run the following command in the gymguru directory in the terminal to install the required dependencies: npm install

Step 9: Configure AWS Amplify

1. Using the same terminal in Step 7, run this command: amplify configure *You may be taken/redirected to the AWS console page to create a user etc during this part of the setup, ignore this and close the pages when they pop up since we have already done this*
2. Sign in to your AWS account when prompted if you are not already signed in. For the region, enter the same region you used for the other AWS services (eg. us-west-1).
3. Enter the Access Key ID and Secret Access Key from the CSV/Excel file downloaded earlier.

Step 10: Initialize Amplify ALMOST THERE :)

1. In the terminal, run amplify init.
2. Follow the prompts to set up the Amplify project. MAKE SURE YOU CHOOSE THE SAME REGION WHERE YOUR AMAZON SERVICES ARE LOCATED
3. After the project is initialized, run amplify push.

Step 11: Test the app with Expo

1. Go to the apple or android store (Depending on which phone you have) and download the Expo app onto your physical device.
2. In your terminal, run this code: expo start.
3. Open the Expo app on your iPhone (if you have an iPhone) and scan the QR code displayed in the terminal or browser window.

That's it! The GymGuru application should now be running on your phone for testing. If you encounter any issues, please contact the repository owner with the exact error message for assistance.

## License

This work is licensed under a [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](https://creativecommons.org/licenses/by-nc-nd/4.0/).
