const createWelcomeEmailTemplate=function(name){
	return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to PlatEase</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
  <div style="background: linear-gradient(to right, #ff6f00, #ffcc00); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <img src="https://res.cloudinary.com/dijtqnilb/image/upload/v1747654763/WhatsApp_Image_2025-05-19_at_15.43.16_73c1b710_osonyr.jpg" alt="PlatEase Logo" style="width: 100px; margin-bottom: 20px; border-radius: 10px;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to PlatEase!</h1>
    <p style="color: white; font-size: 16px; margin-top: 10px;">Where great food meets great vibes 🍽️✨</p>
  </div>

  <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <p style="font-size: 18px; color: #ff6f00;"><strong>Hello ${name},</strong></p>
    <p>Thanks for signing up with <strong>PlatEase</strong> — your ultimate destination for a delightful walk-in food experience.</p>

    <div style="background-color: #fff7e6; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="font-size: 16px; margin: 0;"><strong>Here’s what you can enjoy:</strong></p>
      <ul style="padding-left: 20px;">
        <li>View our full menu online before visiting</li>
        <li>Save your favorite dishes</li>
        <li>Get notified about new items and offers</li>
        <li>Earn rewards on in-store purchases</li>
      </ul>
    </div>

    <p>Just walk in, place your order, and enjoy freshly prepared meals in a warm and welcoming environment. We can't wait to serve you!</p>

    <p>If you have any questions or feedback, feel free to reach out — we're always happy to help.</p>

    <p style="margin-top: 30px;">See you!<br><strong>The PlatEase Team</strong></p>
  </div>
</body>
</html>
  `;
}


module.exports = {createWelcomeEmailTemplate}