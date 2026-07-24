import API from "./api";

export interface ApiResponse {
  message: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

// Send OTP
export const forgotPassword = async (
  data: ForgotPasswordRequest
): Promise<ApiResponse> => {
  const res = await API.post<ApiResponse>(
    "/auth/forgot-password",
    data
  );

  return res.data;
};

// Verify OTP
export const verifyOTP = async (
  data: VerifyOTPRequest
): Promise<ApiResponse> => {
  const res = await API.post<ApiResponse>(
    "/auth/verify-otp",
    data
  );

  return res.data;
};

// Reset Password
export const resetPassword = async (
  data: ResetPasswordRequest
): Promise<ApiResponse> => {
  const res = await API.post<ApiResponse>(
    "/auth/reset-password",
    data
  );

  return res.data;
};

// Resend OTP
export const resendOTP = async (
  email: string
): Promise<ApiResponse> => {
  const res = await API.post<ApiResponse>(
    "/auth/resend-otp",
    {
      email,
    }
  );

  return res.data;
};