// Vercel Serverless Function to serve game stage data.
// This data is served from the backend, allowing for easier updates and maintenance.
// Total Stages: 15 (6 Phishing, 4 Password, 5 Quiz)

const stages = [
    // --- PHISHING DETECTION STAGES (6 TOTAL) ---
    {
        id: 1,
        type: 'PHISHING',
        title: 'Urgent Account Suspension Notice',
        sender: 'support@amz0n.com', // Note the '0' instead of 'o'
        subject: 'ALERT: Your Amazon Account Has Been Temporarily Suspended',
        body: 'Due to unusual login activity from a new location, we have suspended your account for your protection. To restore full access immediately and prevent permanent closure, click the link below to verify your details.\n\n[Link: Verify My Account Now]',
        correct: 'PHISHING',
        tip: 'Phishing Alert! Always check the sender\'s email address. The domain `amz0n.com` is a **typo-squatting** attempt, using a zero (0) instead of an "o" to look legitimate. Amazon will never ask you to verify details via an unsolicited link.',
    },
    {
        id: 2,
        type: 'PHISHING',
        title: 'Important Tax Refund Notification',
        sender: 'noreply@IRS.gov', // Legitimate domain, but usually not this specific structure
        subject: 'IRS Notification: Your $450.00 Tax Refund Is Ready',
        body: 'The Internal Revenue Service has determined you are eligible for a tax refund of $450.00. Please click on the link below to securely submit your banking information for direct deposit. Note: This offer expires in 48 hours.\n\n[Link: Claim Your Refund Here]',
        correct: 'PHISHING',
        tip: 'Phishing Alert! Government agencies, including the IRS, **never** initiate contact about tax refunds or required information via unsolicited email. They use official mail. The urgency is a classic scare tactic.',
    },
    {
        id: 3,
        type: 'PHISHING',
        title: 'New Voicemail Message',
        sender: 'voicemail-service@yourcompany.com',
        subject: 'New Voicemail from +1 (555) 555-1234',
        body: 'You have received a new voice message. Click the link below to listen to the recording. Note: The message will be deleted after 24 hours.\n\n[Link: Click to Listen to Voicemail]',
        correct: 'PHISHING',
        tip: 'Phishing Alert! Voicemail notifications that ask you to click a link to listen (especially if they look like an attachment or external link) are often scams. Check the URL carefully or listen via your official phone/desktop app, not through an email link.',
    },
    {
        id: 4,
        type: 'PHISHING',
        title: 'Software Update Notification',
        sender: 'system-updates@apple.com',
        subject: 'Required System Security Update Available',
        body: 'Your device requires an immediate security patch to prevent critical vulnerabilities. Please ensure you are connected to power and click "Update Now" to install the patch via our secure server.',
        correct: 'LEGITIMATE',
        tip: 'Legitimate! This message is generic and relates to standard, expected system maintenance. While scams exist, the content is typical of necessary software updates. However, it\'s always safer to update directly through your device settings, not by clicking the email link.',
    },
    {
        id: 5,
        type: 'PHISHING',
        title: 'Invoice Payment Due',
        sender: 'billing@contosohosting.com',
        subject: 'ACTION REQUIRED: Outstanding Invoice #2024-87A',
        body: 'Dear Customer, your invoice for hosting services is past due. To avoid disruption of service, please click the secure payment portal link below to complete your payment within 2 hours.\n\n[Link: Secure Payment Portal]',
        correct: 'PHISHING',
        tip: 'Phishing Alert! This is a "spear-phishing" attempt if you don\'t use Contoso Hosting. Check if you even have an account with the sender. If you do, go to the site directly in your browser, **do not click the link** demanding urgent payment.',
    },
    {
        id: 6,
        type: 'PHISHING',
        title: 'Social Media Tag Notification',
        sender: 'notifications@instagram.com',
        subject: 'Jane Doe tagged you in a new post.',
        body: 'Jane Doe has tagged you in a new photo! You must log in to view the content. Click here to see the photo: [Link: View Photo]',
        correct: 'LEGITIMATE',
        tip: 'Legitimate! This is a typical, expected notification from a social media platform. While still cautious, the sender domain (`instagram.com`) and the generic notification style are usually safe. (But still, always verify on the app, not in the email).',
    },

    // --- PASSWORD CHECKER STAGES (4 TOTAL) ---
    { id: 7, type: 'PASSWORD', title: 'Create a Password for Your Banking App' },
    { id: 8, type: 'PASSWORD', title: 'Create a Password for Your Work VPN' },
    { id: 9, type: 'PASSWORD', title: 'Create a Password for Your Personal Email' },
    { id: 10, type: 'PASSWORD', title: 'Create a Password for Your Streaming Service' },

    // --- NEW CYBERSECURITY AWARENESS QUIZ (5 TOTAL) ---
    {
        id: 11,
        type: 'QUIZ',
        question: 'Which of the following is the strongest defense against ransomware?',
        options: [
            'Using a Virtual Private Network (VPN)',
            'Regularly backing up all critical data offline or to a cloud service',
            'Disabling your firewall',
            'Only browsing websites using HTTP'
        ],
        answer: 'Regularly backing up all critical data offline or to a cloud service',
        explanation: 'If your data is encrypted by ransomware, the most effective recovery is restoring from a recent backup. VPNs and firewalls help prevent infection, but backups ensure recovery.',
    },
    {
        id: 12,
        type: 'QUIZ',
        question: 'What does "MFA" stand for in cybersecurity?',
        options: [
            'Malicious File Authorization',
            'Main Firewall Access',
            'Multi-Factor Authentication',
            'Managed File Authority'
        ],
        answer: 'Multi-Factor Authentication',
        explanation: 'Multi-Factor Authentication (MFA) requires two or more verification methods (like a password AND a code from your phone) to prove identity, making accounts much harder to compromise.',
    },
    {
        id: 13,
        type: 'QUIZ',
        question: 'What is the most secure way to manage dozens of unique, complex passwords?',
        options: [
            'Write them down in a notebook',
            'Use the same strong password for all accounts',
            'Use a trusted, encrypted password manager (like Google Password Manager, 1Password, or LastPass)',
            'Store them in a spreadsheet on your computer'
        ],
        answer: 'Use a trusted, encrypted password manager (like Google Password Manager, 1Password, or LastPass)',
        explanation: 'Password managers store unique, complex passwords securely and encrypted, requiring only one master password for access. This is significantly safer than reusing passwords or writing them down.',
    },
    {
        id: 14,
        type: 'QUIZ',
        question: 'What is "tailgating" in physical security and social engineering?',
        options: [
            'Following someone into a restricted access area without using your own key or badge.',
            'Sending emails from a compromised account.',
            'Scanning a network for open ports.',
            'Guessing a user\'s password repeatedly.'
        ],
        answer: 'Following someone into a restricted access area without using your own key or badge.',
        explanation: 'Tailgating is a social engineering attack where an unauthorized person follows an authorized person through a secured entry point (like an ID card access door) without permission or proper credentials.',
    },
    {
        id: 15,
        type: 'QUIZ',
        question: 'If you receive a phone call claiming to be from your bank asking for your full debit card number to "verify an account issue," what should you do?',
        options: [
            'Immediately provide the information to resolve the issue.',
            'Ask for the caller\'s ID and call them back later.',
            'Hang up and call the bank\'s official number (found on their website or the back of your card).',
            'Give them a fake card number.'
        ],
        answer: 'Hang up and call the bank\'s official number (found on their website or the back of your card).',
        explanation: 'Never give sensitive information over the phone when you receive an unexpected call. Always hang up and call the official number yourself to confirm the legitimacy of the request. This avoids "vishing" (voice phishing) scams.',
    }
];

module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    // Enable CORS for Vercel deployment and local testing
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // --- Shuffle Logic ---
    // We shuffle the first 10 stages (Phishing/Password) but keep the 5 Quiz stages at the end
    const phishingAndPasswordStages = stages.slice(0, 10);
    const quizStages = stages.slice(10); // Stages 11-15 (The new quiz)

    // Simple Fisher-Yates shuffle for the first 10 stages
    for (let i = phishingAndPasswordStages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [phishingAndPasswordStages[i], phishingAndPasswordStages[j]] = [phishingAndPasswordStages[j], phishingAndPasswordStages[i]];
    }

    // Combine the shuffled stages with the quiz stages at the end
    const finalStages = [...phishingAndPasswordStages, ...quizStages];

    res.status(200).json({
        totalStages: finalStages.length,
        stages: finalStages
    });
};

