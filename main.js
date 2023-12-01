const navbar = document.getElementById("navbar");
const skillset = document.getElementById("skillset");
const profiles = document.getElementById("profile");
const projectItems = document.getElementById("project-items");
const experienceItems = document.getElementById("experience-items");
const educationItems = document.getElementById("education-items");
const errorMsg = document.getElementById("error-msg");
const navBtn = document.getElementById("nav-btn");

const colors = ["darkcyan", "lime", "orangered"];

function changeNavIcon() {
  if (navBtn.innerHTML == '<i class="fa fa-times"></i>') {
    navBtn.innerHTML = '<i class="fa fa-bars"></i>';
    navBtn.style.color = "grey";
  } else {
    navBtn.innerHTML = '<i class="fa fa-times"></i>';
    navBtn.style.color = "red";
  }
}

function download(e) {
  var link = document.createElement("a");
  link.href = "./resources/Ritesh_CV.pdf";
  link.download = "Resume_Ritesh_Sur_Chowdhury.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function changeArrow(e) {
  if (e.innerHTML.includes("up")) {
    e.innerHTML = `Show Details <i class="fa fa-caret-down"></i>`;
  } else {
    e.innerHTML = `Hide Details <i class="fa fa-caret-up"></i>`;
  }
}

fetch("resources/education.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((edu, index) => {
      educationItems.innerHTML += `
        <li class="list-group-item education mx-auto d-flex justify-content-center border-0">
          <div class="p-2">
            <img src=${edu.logo}  style="height: 6rem; width: 6rem">
          </div>
          <div class="p-2" style="width: 90%">
            <div class="d-flex justify-content-between">
                <label class="fs-5 fw-bold custom-text-color">${edu.institutionName}</label>
                <label class="fs-6 fw-bold pt-2">${edu.institutionType}</label>
            </div >
            <div class="d-flex justify-content-between">
              <p class="fs-6 fw-light mb-0">${edu.degree}</p>
              <p class="fs-6 fw-normal mb-0">${edu.score}</p>
            </div>
            <div class="d-flex justify-content-between">
              <p class="fs-6 fw-light mb-0">${edu.branch}</p>
              <p class="fs-6 fw-light mb-0">${edu.duration}</p>
            </div>
          </div>
        </li>
      `;
    });
  });

fetch("resources/experience.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((exp, index) => {
      experienceItems.innerHTML += `
        <li class="list-group-item education mx-auto d-flex justify-content-center border-0">
          <div class="p-2 pb-3">
            <img src=${exp.logo} style="height: 6rem; width: 6rem">
          </div>
          <div class="p-2" style="width: 90%">
            <div class="d-flex justify-content-between">
                <label class="fs-4 fw-bold custom-text-color">${exp.company}</label>
                <label class="fs-6 fw-bold pt-2">${exp.location}</label>
            </div>
            <div class="d-flex justify-content-between">
                <label class="fs-6 fw-normal custom-text-color">Role: ${exp.role}</label>
                <label class="fs-6 fw-light pt-2">${exp.duration}</label>
            </div>
          </div>
        </li>
      `;
    });
  });

fetch("resources/skills.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((skill, index) => {
      skillset.innerHTML += `
        <div class="col-md-2 col-sm-6" >
          <img src="${skill.logo}" style="height: 8rem" alt="">
        </div>
      `;
    });
  });

fetch("resources/projects.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((project, index) => {
      projectItems.innerHTML += `
        <div class="col-md-4">
          <div class="card bg-light border rounded-0 mb-5">
            <img class="rounded-0" src="${project.logo}" style="height: 14rem">
            <div class="card-body text-left">
              <h3 class="fw-bold">${project.name}</h3>
              <p class="card-text">${project.description}<p>
              <span class="badge bg-light text-dark border rounded-0 fs-6 fw-light p-3">
                <b class="me-2">Github Link(s): </b>
                ${project.githubLink
                  .map(
                    (e, index) =>
                      `<a href=${
                        e.link
                      } target="_blank" class="fw-light me-2">Link${
                        index + 1
                      }</a>`
                  )
                  .join("")}
              </span>
              <span>
                ${
                  project.projectDetailsLink !== ""
                    ? `<a href=${project.projectDetailsLink} target="_blank">
                        <button class="btn btn-primary rounded-0 fs-6 fw-light p-2">Watch Demo</button>
                      </a>`
                    : `<span></span>`
                }
                ${
                  project.websiteLink !== ""
                    ? `<a href=${project.websiteLink} target="_blank">
                        <button class="btn btn-primary rounded-0 p-2 m-1">Visit Website</button>
                      </a>`
                    : `<span></span>`
                }
              </span>
            </div>
          </div>
        </div>
        `;
    });
  });

fetch("resources/profile.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((profile, index) => {
      profiles.innerHTML += `
        <div class="col-md-3 col-sm-6" >
          <a href="${profile.link}" target="_blank">
            <img src="${profile.logo}" style=" height: 8rem" alt="">
          </a>
        </div>
      `;
    });
  });

function handleFormSubmit(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const subject = e.target.subject.value;
  const body = e.target.body.value;

  sendEmail(name, email, subject, body, () => {
    e.target.name.value = "";
    e.target.email.value = "";
    e.target.subject.value = "";
    e.target.body.value = "";
    errorMsg.innerHTML = "";
  });
}

function sendEmail(name, email, subject, body, callback) {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "riteshsurchowdhury2001@gmail.com",
    Password: "18C2EE26A1BA83A5FB88018E92EDDD3384D3",
    To: "riteshsurchowdhury2001@gmail.com",
    From: email,
    Subject: subject,
    Body: body,
  }).then((message) => {
    console.log(message);
    if (message === "OK") {
      alert("Mail Sent to Ritesh Sur Chowdhury");
      callback();
    } else {
      errorMsg.innerHTML = "Please check your Email ID";
    }
  });
}

function resetForm() {
  document.getElementById("contact-form").reset();
}
