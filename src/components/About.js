import React from "react";

export default function About() {
  return (
    <div>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              url="../notes.jpg"
              className="img-fluid rounded-start"
              alt="...."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">About the website</h5>
              <p className="card-text">
                <strong> Secure Login </strong>
                <br />
                To start using our note-taking service, you'll need to create a
                personal account. We employ industry-standard encryption
                techniques to protect your login credentials, ensuring that your
                password and personal information are securely stored. Rest
                assured that your account is for your eyes only.
                <br />
                <strong>Private and Encrypted Notes</strong>
                <br />
                Once you're logged in, you can create as many notes as you need.
                Each note is encrypted using advanced algorithms, making it
                virtually impossible for anyone else to access the content
                without your authorization. Your notes are for your eyes only,
                providing you with a safe and private space to record your
                thoughts, ideas, and important information.
                <br />
                <strong>Note Management Made Easy</strong>
                <br />
                Our user-friendly interface allows you to easily organize and
                manage your notes. You can categorize them, assign tags, and
                apply filters to quickly find the information you need.
                Additionally, you have the flexibility to edit or delete your
                notes whenever you want, ensuring that you stay in control of
                your own data.
                <br />
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Design of website is not priorety
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
