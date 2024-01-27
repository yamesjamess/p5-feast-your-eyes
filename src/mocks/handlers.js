import { rest } from "msw";

// Define the base URL for the API
const baseURL = "https://fye-drf-api-6b84783d9a37.herokuapp.com/";

// Array of request handlers for different API endpoints
export const handlers = [
  // Request handler for getting user information
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    // Return a mocked JSON response representing a user
    return res(
      ctx.json({
        pk: 2,
        username: "tom",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 2,
        profile_image:
          "https://res.cloudinary.com/dukqu7lia/image/upload/v1/media/../default_profile_cyegbs",
      })
    );
  }),
  
  // Request handler for simulating user logout
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
