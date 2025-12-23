let dataList = [];

fetch("data.json")
    .then(res => res.json())
    .then(data => {
        dataList = data;
        renderTable(dataList);
    });

function renderTable(data) {
    const body = document.getElementById("tableBody");
    body.innerHTML = "";

    if (data.length === 0) {
        document.getElementById("notfound").classList.remove("hide");
        return;
    }

    document.getElementById("notfound").classList.add("hide");

    data.forEach((item, index) => {
        body.innerHTML += `
        <tr>
            <td>${item.customer}</td>
            <td>${item.site}</td>
            <td>${item.agency}</td>
            <td class="delete" onclick="deleteData(${index})">ลบ</td>
        </tr>`;
    });
}

function searchData() {
    const keyword = document.getElementById("search").value.toLowerCase();
    const result = dataList.filter(d =>
        d.customer.toLowerCase().includes(keyword) ||
        d.site.toLowerCase().includes(keyword) ||
        d.agency.toLowerCase().includes(keyword)
    );
    renderTable(result);
}

function addData() {
    const customer = document.getElementById("customer").value;
    const site = document.getElementById("site").value;
    const agency = document.getElementById("agency").value;

    if (!customer || !site || !agency) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    dataList.push({ customer, site, agency });
    renderTable(dataList);

    document.getElementById("customer").value = "";
    document.getElementById("site").value = "";
    document.getElementById("agency").value = "";
}

function deleteData(index) {
    if (confirm("ต้องการลบข้อมูลหรือไม่")) {
        dataList.splice(index, 1);
        renderTable(dataList);
    }
}