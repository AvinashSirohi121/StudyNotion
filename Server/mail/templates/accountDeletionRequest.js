exports.accountDeletionRequest = (email, name) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Account Deletion Request Received</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
                color: #ff9900;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
    
            .btn {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                font-weight: bold;
                color: #ffffff;
                background-color: #ff9900;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="message">Account Deletion Request Received</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>We have received a request to delete your account associated with the email <span class="highlight">${email}</span>.</p>
                <p>The process of deleting your account will take up to <span class="highlight">7 working days</span>. If this request was not made by you, please contact us immediately to secure your account and cancel the deletion process.</p>
                <p>If this request was intentional, no further action is needed on your part.</p>
            </div>
            <a href="mailto:info@studynotion.com" class="btn">Contact Support</a>
            <div class="support">If you have any questions or need further assistance, please feel free to reach out to us at <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!</div>
        </div>
    </body>
    
    </html>`;
};
