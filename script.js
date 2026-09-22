    let jobs = JSON.parse(localStorage.getItem("jobs"))||[];

    let jobList = document.getElementById("jobList");
    let jobCount = document.getElementById("jobCount");

    function updateJobCount() {
        jobCount.textContent = "Total Application; " + jobs.length;
    }

    updateJobCount();

    function addJob(company, position, status, save = true) {
        if (save) {
            jobs.push({
                company: company,
                position: position,
                status: status
            });

        localStorage.setItem("jobs",JSON.stringify(jobs));
        updateJobCount();
        }

        let newJob = document.createElement("p")

        newJob.textContent =
            company +
            " - " +
            position +
            " - " +
            status;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            let index = jobs.findIndex(function(job) {
                return job.company === company &&
                       job.position === position &&
                       job.status === status;
            });

            if (index !== -1) {
                jobs.splice(index, 1);
                localStorage.setItem("jobs", JSON.stringify(jobs));
            }

            newJob.remove();

        });
        
        newJob.appendChild(deleteButton);

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function () {
            let newStatus = prompt("Enter new status:");

            if (newStatus === "" || newStatus === null) {
                return;
        }

        let index = jobs.findIndex(function (job) {
            return job.company === company &&
            job.position === position;
        });

        if (index !== -1) {
            jobs[index].status = newStatus;
            localStorage.setItem("jobs", JSON.stringify(jobs));
        }

        status = newStatus;
        
        newJob.firstChild.textContent =
            company +
            " - " +
            position +
            " - " +
            newStatus +
            " ";
    });

        newJob.appendChild(editButton);
        
        jobList.appendChild(newJob);
    }

    for (let i = 0; i < jobs.length; i++){
        addJob(jobs[i].company,jobs[i].position, jobs[i].status,false);
    }

    let addJobButton = document.getElementById("addJobButton");
    addJobButton.addEventListener("click", function () {
        let company = document.getElementById("companyInput").value;
        let position = document.getElementById("positionInput").value;
        let status = document.getElementById("statusInput").value;

        if (company === "" || position === "" || status === "") {
            alert("Please fill in all fields.");
            return;
        }
        
        addJob(company, position, status);


        document.getElementById("companyInput").value = "";
        document.getElementById("positionInput").value = "";
        document.getElementById("statusInput").value = "";
    });

    let searchInput = document.getElementById("searchInput");
    let statusFilter = document.getElementById("statusFilter");
    searchInput.addEventListener("input", function () {
        let searchText = searchInput.value.toLowerCase();

        let jobItems = jobList.querySelectorAll("p");

        jobItems.forEach(function (jobItem) {
            let jobText = jobItem.textContent.toLowerCase();
            let selectedStatus = statusFilter.value;

            let matchesSearch = jobText.includes(searchText);
            let matchesStatus = 
                selectedStatus === 'all' ||
                jobText.includes(selectedStatus.toLowerCase());

            if (matchesSearch && matchesStatus) {
                    jobItem.style.display = "block";
                } else {
                    jobItem.style.display = "none";
                }
            });
    });

    statusFilter.addEventListener("change", function () {
        let selectedStatus = statusFilter.value;

        let jobItems = jobList.querySelectorAll("p");

        jobItems.forEach(function (jobItem) {
            let jobText = jobItem.textContent.toLowerCase();
            let searchText = searchInput.value.toLowerCase();

            let matchesSearch = jobText.includes(searchText);
            let matchesStatus = 
                selectedStatus === 'all' ||
                jobText.includes(selectedStatus.toLowerCase());

            if (matchesSearch && matchesStatus) {
                    jobItem.style.display = "block";
                } else {
                    jobItem.style.display = "none";
                }
        });
    });