### `npm start` You can run the project by entering the command in the terminal. Don't forget to run the `npm install` command before starting the project!

The project is based on the JSONPlaceholder fake API.

The project is structured in three different ways: Normal, Context, and Redux. You can access other projects with different structures on my GitHub account.
### https://github.com/shooterfanas

Project Overview
---------------
- ✅ User Login
- ✅ Authentication-based private routing
- Profile page (Fetches user, post, album, and todo information for the user)
- ✅ Todo page (React Beautiful DnD)
- ✅ Album page (Load More)
- ✅ Photos (Album Detail Page) (React Infinite Scroll Component)
- ✅ Posts page (Pagination)
- About Me page (Information about the project owner and preview of a PDF using react-pdf)
- ✅i18n multilanguage support
- Theme settings
- ✅Responsive design
- ✅ React Moment
- ✅ React - Embla Carousel
- ✅ yet-another-react-lightbox
- Breadcrumb
- Limit settings (items per page, etc.)


Project Details
---------------
- Fake User Login:
    - As there is no password in the /users endpoint of the API, login is performed in the format of email and username (used as a password).

    - Cookie Operations: If the "Remember Me" option is selected, a 7-day cookie is set. If "Remember Me" is not selected, an expiration period of 10 seconds is set (this has been configured for faster testing of functionality). After this period, an automatic logout process is triggered.

    - Home Layout is a component that appears on every page, so there is an interval that checks the change of the location value every 10 seconds using useEffect (this is configured to quickly see the alert if "Remember Me" is not selected). If there is no cookie, the "checkAndLogout" function is executed, checking the existence of the cookie. If there is no cookie, the showCountdown state is set to true, displaying an alert that the user's session will be terminated in 5 seconds, and after the countdown, the user is logged out and redirected to the home page.

- Profile Page:
    - My Posts:
        - The endpoint containing the posts does not have any date values. We add a date value to each post in our object, display the date on the card, and perform sorting based on the date.
        
        - Server-side pagination is available.
        
        - Pagination is configured to be 2 posts per page, and a total of 10 posts are retrieved from the endpoint per user.
    - My Todos:
        - The components from the Todo page are also used here.
    - My Albums:
        - The My Album component on the Album page is also utilized here.
    - About Me:
        - Information about the user logging in via the API is available.
        - You can update your user information by clicking the Update button (Since it's a Fake API, a PUT request is sent, but the data is kept in the state as the page is refreshed on the actual API).
    - The endpoints provided by the API are separated into tables: Post, Album, Todo, and About.

    - All data in the tables comes from the "Datas.js" file in the "components" folder.


- Posts Page:
    - It has My Posts and All Posts switches, with My Posts being the default. When All Posts is selected, all posts retrieved from the API are sorted by date values.
    
    - All Posts are listed with pagination.
    
    - My Posts are displayed with a timeline design.
    
    - Post sorting is done in chronological order based on the timeline design.
    
    - For All Posts, all posts in the endpoint are fetched, and users are also fetched. If the Post's userId matches the user's id, the username of the post owner is added to our post object.
    
- Post Detail Page:
    - Accessed by clicking the "Read More" link on the posts page with routing in the format /post/:id.
    
    - The id information in the URL is obtained using the useParams() hook, and data is retrieved from the API based on this value.
    
    - Comments matching the post id are added below the post detail card, click the "Comments" button to view the comments.

- Todo Page:
    - Utilizes React Beautiful DnD for Drag & Drop functionality.
    
    - Displays the user's todo data.
    
    - When dragging and dropping an incomplete todo to complete, the state is updated.
    
    - You can mark todos as completed by clicking the check icon.
    
    - In Active Task, todos have edit, delete, and mark as completed features. When clicked, an input opens, and by pressing "Enter," it is saved, updating the state.
    
    - Moving a todo from Active Task to Completed Task automatically adds a strikethrough.
    
    - You can add new todos using the input. However, when you refresh the page, the data fetched from the API will be displayed again, and the added todos will be cleared.
    
    - Based on the data from the API, those with "completed" set to true appear in the Completed Tasks section, while those with false are added under Active Task.
    
    - When you move an active task to the completed task section, the state's completed value is updated to true.
 

- Album Page:
    - Fetches albums from the API, and similar to the post page, content can be switched between My Album and All Album using the switch button.
    
    - Since there is no cover photo in the album data, I made a request to the photos of the respective album, randomly selected 4 photos, and added them to my object as a cover photo.
    
    - Utilizes the Load More technique on the Album page.
    
    - By clicking the "Eye" icon on the album card, you can access the photos page. The Photos page displays the photos within the album.
    
    - The album cards display the date when the album was created (not provided by the API; it was added separately when fetching the data).
    
    - The Edit icon allows you to update the album title.
    
    - After saving the edit operation, a PUT request is made in the background. The data from the promise is taken, the title value of the object matching the id with our state is updated, and the state is refreshed.
    
    - The X icon can be used to cancel the edit operation.
    
    - The trash bin icon allows you to delete the respective album.

- Photos Page:
    - Using useParams from AlbumDetail.js, I pass the id parameter to my AlbumToPhotos function in data.js, make a request to the API based on this id, and fetch the data.
    
    - I add a date to the photos and sort them by date.
    
    - The first 3 photos are displayed using React Embla Carousel, and the remaining photos are listed under the carousel with infinite scroll.
    
    - It features the Infinite Scroll functionality.
    
    - When you hover over a photo, the cursor changes, and when you click, it opens as a lightbox ("yet-another-react-lightbox").

- Lightbox for Photo Details:
    - Clicking on one of the photos in the album opens a lightbox ("yet-another-react-lightbox").
    
    - In the top left corner of the lightbox, there is information about the current number of the photo among the total number of photos (e.g., 2/20).
    
    - While the lightbox is open, you can zoom in by using the zoom icons in the top right corner or by double-clicking/tapping on the screen.
    
    - The title of the photo is displayed below the photo.