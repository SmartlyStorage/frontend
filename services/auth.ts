// services/auth.ts
import { AppDispatch } from "@/store";
import { clearUser, setUser } from "@/store/userSlice";
import { GoogleSignin, User } from "@react-native-google-signin/google-signin";

const SCOPES = [
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.install",
  "https://www.googleapis.com/auth/docs",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.activity",
  "https://www.googleapis.com/auth/drive.activity.readonly",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive.metadata",
];

export function configureGoogleSignin() {
  const webClientId = process.env.EXPO_PUBLIC_WEB_CLIENT_ID;

  if (!webClientId) {
    throw new Error("Missing EXPO_PUBLIC_WEB_CLIENT_ID environment variable");
  }

  GoogleSignin.configure({
    scopes: SCOPES,
    webClientId,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });
}

export async function signInWithGoogle(dispatch: AppDispatch): Promise<void> {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  const tokens = await GoogleSignin.getTokens();

  dispatch(setUser({
    user: userInfo.data as User,
    accessToken: tokens.accessToken,
    idToken: tokens.idToken,
  }))
}

export async function signOutFromGoogle(dispatch: AppDispatch): Promise<void> {
  await GoogleSignin.signOut();
  dispatch(clearUser())
}
