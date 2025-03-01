import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.models.js";
import { uploadOnCLDNIARY } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessTokens();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "SWW while generating refres and access token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  const { fullname, email, username, password } = req.body;

  //validation - correct email, empty string, etc
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //check if exists already
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  //check for images & avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImgLocalPath = req.files?.coverImage[0]?.path;

  let coverImgLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImgLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  //upload them to cloudinary
  const avatar = await uploadOnCLDNIARY(avatarLocalPath);
  const coverImage = await uploadOnCLDNIARY(coverImgLocalPath);

  if (!avatar || !avatar.url) {
    throw new ApiError(400, "Avatar is required");
  }

  //create user object - create entry in db
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  //remove password & refresh token from response

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  //check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  //return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //req body data le aao
  const { email, username, password } = req.body;

  if (!username || !email) {
    throw new ApiError(400, "username or email is required");
  }

  //username or email
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  //find the user
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  //password check
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  //access and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    -password - refreshToken
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  //send cookies
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in Successfully"
      )
    );

  const logoutUser = asyncHandler(async (req, res) => {
    User.findById;
  });

  //send response -> registered successfully
});

export { registerUser, loginUser };
