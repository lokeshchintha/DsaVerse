
import { SimpleNavbar } from "@/components/SimpleNavbar";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <SimpleNavbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using CodeMaster OS, you accept and agree to be bound by the terms 
              and provision of this agreement. These Terms of Service govern your use of our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily access CodeMaster OS for personal, non-commercial 
              transitory viewing only. This is the grant of a license, not a transfer of title, and 
              under this license you may not:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display</li>
              <li>attempt to reverse engineer any software contained on the platform</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Account Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and password. 
              You agree to accept responsibility for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Premium Membership</h2>
            <p>
              Premium membership provides access to additional features and content. Subscription 
              fees are non-refundable except as required by law. You may cancel your subscription 
              at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. XP and Virtual Currency</h2>
            <p>
              Experience Points (XP) are virtual currency used within the platform. XP has no 
              real-world monetary value and cannot be exchanged for real money. We reserve the 
              right to modify XP balances for maintenance or fraud prevention.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Code Submission and Intellectual Property</h2>
            <p>
              By submitting code or solutions to our platform, you grant us a non-exclusive license 
              to use, display, and analyze your submissions for educational and platform improvement 
              purposes. You retain ownership of your original code.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Prohibited Uses</h2>
            <p>You may not use CodeMaster OS:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimer</h2>
            <p>
              The materials on CodeMaster OS are provided on an 'as is' basis. CodeMaster OS makes 
              no warranties, expressed or implied, and hereby disclaims and negates all other warranties 
              including without limitation, implied warranties or conditions of merchantability, fitness 
              for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Limitations</h2>
            <p>
              In no event shall CodeMaster OS or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on CodeMaster OS, even if 
              CodeMaster OS or an authorized representative has been notified orally or in writing 
              of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Revisions and Errata</h2>
            <p>
              The materials appearing on CodeMaster OS could include technical, typographical, or 
              photographic errors. CodeMaster OS does not warrant that any of the materials on its 
              website are accurate, complete, or current. CodeMaster OS may make changes to the 
              materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws 
              and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at 
              support@codemasteros.com.
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
