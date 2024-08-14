# My Wellness


Statistics show 39% of students in college will experience a significant mental health issue along with that 50% of mental health issues begin in most people at the age of 14. How might we facilitate connections between users that encourages them to be intentional about reaching out while reaching in emotionally to improve their mental health? Introducing My Wellness, Where mindfulness fosters connection. 

## My Wellness (React Native App)
Young adults and teens lack tools and guidance, reaching out to their support system
Incorporating wellness into their life
My Wellness is a React Native app designed to provide users with initiatives to incorporate mindfulness into their everyday lives. 


My Wellness is a group project made for Snap Academies 2024 final showcase.

# Setup and Development


## Prototype
We developed our prototype using React Native, Expo, and Apple's Xcode simulator, ensuring compatibility with iOS platforms. The app is optimized for recent iPhone models.
# How To Use

To explore our prototype, you will need the Expo app on your phone or computer. We recommend running our app through Expo on your phone by scanning the provided QR code to access the project prototype.

To run our app: 
1. Install the Expo app onto your phone from the App store.
2. Open the Expo app. 
3. Log in to the team’s expo account: 
Note: Please only use this to scan the QR code in order to run the project. Log in to the account designated by one of the team members for logging in using the following username and password: 
Username: mywellness 
Password: MyWellness2024 
4. Scan the QR code from our project URL with your phone camera or with a QR code scanner. A banner will appear prompting you to open the Expo app. Click on it.
5. My Wellness app should now open and display an onboarding screen similar to Snapchat.

## Limitations
We were unable to implement all the features we had planned for our app due to technical limitations and time constraints. As a result, the following features were not included:
Check-Ins
Live and Present

## Implementation Details
Daily Snaps
Daily Snaps are four wellness-focused initiatives that we prompt the user with daily. These initiatives include Snap Besties, Check-Ins, Live and Present, and My Wellness AI. By completing any of these four initiatives each day, users can build and maintain a wellness streak, encouraging daily engagement and mindfulness.
For the Snap Besties initiative, we have curated a set of prompts stored in a table in Supabase. Each day, the user will receive a new prompt encouraging them to reach out and "snap" a bestie. 

My Wellness bot
My Wellness AI is a carefully prompt-engineered chatbot designed to help users navigate their thoughts and emotions in a supportive manner, much like a therapist would. Instead of providing direct solutions, the bot guides users by asking open-ended questions, encouraging self-reflection and deeper understanding of their feelings. We've implemented this feature using the ChatGPT API, ensuring that the interactions remain empathetic and thoughtful, offering a personalized experience tailored to the user's emotional needs.

As for the future of my wellness” we plan to expand the features reach an positive impact by incorporating automated links to hotline when the AI guide detects key crisis indicator vocab from the user, we also plan to implement a long term progress track so users are able to have the option to view past prompts completed throughout the months and years. 

## How To Use: Project Repository

If you’d like to be able to take a look at our source code and run the app using the project repository, follow these instructions. To run the app using Expo and our project repository: 
1. Install the Expo app onto your phone from the App store. 
2. Open the Expo app.
3. Sign-in to a preexisting Expo account or create a new one.
4. Unzip the file that is downloaded.
5. Open the Terminal application to navigate to the file’s location. 
6. Once inside the project directory, you will need to install all of the
necessary packages and dependencies. To do this, run the following
command:
yarn install
7. Once installation of packages and dependencies is complete, you will
need to start the Expo simulator to start the app. To do thus, run the
following command:
yarn expo start
8. A new tab/window will pop up in your browser that shows a QR code on
the left panel.
9. Scan the QR code from the left panel with your phone camera or with a
QR code scanner. A banner will appear prompting you to open the
Expo app. Click on it.
10. My Wellness app should now open and display an onboarding screen.


# Fork the Repository 
Click on the Fork button: This is usually found in the top-right corner of the repository's page. This will create a copy of the repository under your own GitHub account.

## Clone the Forked Repository
1. Go to your forked repository on GitHub.
2. Click on the green "Code" button and copy the URL.
3. Open your terminal or Git Bash and run: 
```js
$ git clone https://github.com/your-username/repository-name.git

```
4. Navigate to the repository directory

## Install Yarn
1. Run the following command to be able to run your program.
```js
$ git yarn install
```

## Set Up the Upstream Remote
1. Add the original repository as a remote: This allows you to pull in updates from the original repository.
```js
$ git remote add upstream https://github.com/Snap-Engineering-Academy-2024/SnapChatStarter.git
```
2. Verify the new remote named 'upstream'

```js
$ git remote -v
```
##  Add Supabase Environment Variable!

Get the code running! You'll need to rename `.env.example` to `.env.local` file. You should be able to reuse the Supabase keys from earlier's week project.
