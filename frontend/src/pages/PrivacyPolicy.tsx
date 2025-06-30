
import { SimpleNavbar } from "@/components/SimpleNavbar";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SimpleNavbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              participate in interactive features, or contact us for support.
            </p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">Information you provide to us:</h3>
            <ul className="list-disc ml-6">
              <li>Account information (username, email, password)</li>
              <li>Profile information (name, profile picture, bio)</li>
              <li>Code submissions and solutions</li>
              <li>Communication data (messages, support requests)</li>
              <li>Payment information (for premium subscriptions)</li>
            </ul>

            <h3 className="text-xl font-medium mt-4 mb-2">Information we collect automatically:</h3>
            <ul className="list-disc ml-6">
              <li>Usage data (pages visited, features used, time spent)</li>
              <li>Device information (browser type, operating system)</li>
              <li>Performance data (code execution times, problem completion rates)</li>
              <li>Log data (IP address, access times, error logs)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and manage your account</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Detect and prevent fraud and abuse</li>
              <li>Personalize content and recommendations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to outside parties 
              except as described below:
            </p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">We may share information:</h3>
            <ul className="list-disc ml-6">
              <li>With service providers who assist in operating our platform</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a merger, acquisition, or sale of assets</li>
              <li>With your consent or at your direction</li>
            </ul>

            <h3 className="text-xl font-medium mt-4 mb-2">Public Information:</h3>
            <ul className="list-disc ml-6">
              <li>Your profile information may be visible to other users</li>
              <li>Your code submissions in contests may be publicly viewable</li>
              <li>Leaderboard rankings and achievements may be displayed publicly</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Monitoring for suspicious activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or as needed to provide 
              services. We may retain certain information after account closure for legitimate business 
              purposes, including:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>Compliance with legal obligations</li>
              <li>Resolution of disputes</li>
              <li>Enforcement of agreements</li>
              <li>Fraud prevention and security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights and Choices</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Access and update your account information</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of promotional communications</li>
              <li>Request a copy of your data</li>
              <li>Object to processing of your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage, 
              and provide personalized content. You can control cookie settings through your browser, 
              but some features may not function properly if cookies are disabled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Third-Party Services</h2>
            <p>
              Our platform may contain links to third-party websites or integrate with third-party 
              services. We are not responsible for the privacy practices of these external services. 
              We encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13. If we become aware that we have 
              collected such information, we will take steps to delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your data in accordance with 
              applicable privacy laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date. 
              Continued use of our service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, 
              please contact us at:
            </p>
            <div className="mt-2">
              <p>Email: privacy@codemasteros.com</p>
              <p>Address: CodeMaster OS Privacy Team</p>
            </div>
          </section>

          <p className="text-sm text-muted-foreground mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
