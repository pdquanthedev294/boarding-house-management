package vn.backend.backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import vn.backend.backend.service.EmailService;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "EMAIL-SERVICE")
public class EmailServiceImpl implements EmailService {

  private final JavaMailSender mailSender;

  @Value("${app.mail.from:quan93909@gmail.com}")
  private String mailFrom;

  @Override
  public void sendEmail(String to, String subject, String body) {
    log.info("Sending email to {} with subject={}", to, subject);
    try {
      SimpleMailMessage message = new SimpleMailMessage();
      message.setTo(to);
      message.setSubject(subject);
      message.setText(body);
      message.setFrom(mailFrom);

      mailSender.send(message);
      log.info("Email sent successfully to {}", to);
    } catch (Exception e) {
      log.error("Failed to send email to {}: {}", to, e.getMessage(), e);
      throw new RuntimeException("Gửi email thất bại: " + e.getMessage(), e);
    }
  }

  @Override
  public void sendPasswordResetOtp(String to, String otp) {
    String subject = "Mã xác thực đặt lại mật khẩu";
    String body = String.format(
      "Mã OTP của bạn là %s. Mã sẽ hết hạn trong 10 phút. Nếu bạn không yêu cầu, hãy bỏ qua email này.",
      otp
    );
    sendEmail(to, subject, body);
  }
}
