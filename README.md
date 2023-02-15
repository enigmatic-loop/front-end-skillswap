# SkillSwap

SkillSwap is a skill trading web application where users can share knowledge with the world, in exchange for knowledge from others.

# Features
- Users can create an account by logging in using their google email login, using the built-in Google Login API
  - Profile information such as name, email, and user icons are pulled from the user's google login
- SkillSwap identifies users by username, so that their real life identities are kept anonymous
- Users may add skills to their profile, complete with descriptions, and expected time commitments for instruction
- Users can search by username or skill name in the provided search bar and click on a result to go to a user's page
- Users may initiate skill swaps with each other and trade knowledge!

## Planned Features
- Direct messaging upon completion of a skill swap
- Notifications when swaps are initiated or accepted by other users
- User following
- Skill commenting
- User icon uploading
- Skill image uploading
- Persistent user login upon refresh
- Tag Deletion

# How to install and run
1. Clone the repository. 
2. Then run `yarn install` inside of the project directory, this will install all of the necessary dependencies from the node_modules folder. 
3. After the dependencies have been installed, run `yarn start` to run the app locally.

## Known Bugs
- Skills that are currently connected to a pending or completed trade cannot be updated or deleted
- Google Login link disappears upon sign out

## Desired Improvements:
- When a skill swap is accepted or declined, the logged in user's Swap lists will be updated without refreshing

## Credits:
Skillswap was designed and built by Nina Sohn and June Valentino
Original Concept by Nina Sohn

## Tech Stack:
- Front-end: React/JS using Material UI and SASS frameworks
- Back-end: Python/Flask/PostgresSQL
- Outside API: Google Login API