package vn.backend.backend.service;

public interface EmailService {
  void sendEmail(String to, String subject, String body);
  void sendPasswordResetOtp(String to, String otp);
}
