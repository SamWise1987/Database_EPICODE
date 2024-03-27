const container = document.querySelector('#tablesContainer');
const bodyContainer = document.querySelector('.bodyContainer');

async function getUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();
        return users;
    } catch (error) {
        console.log("failed to load content", error);
    }
}

async function usoDueFunzioniInUnaNUovaFunzionePerSperimentare() {
    const users = await getUsers();
    displayUsers(users);
}

usoDueFunzioniInUnaNUovaFunzionePerSperimentare();

function displayUsers(users) {
    const table = document.createElement('table');
    table.setAttribute('class', 'table');
    table.innerHTML =
        `
    <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Username</th>
        <th scope="col">Email</th>
    </tr>
    </thead>
<tbody>
</tbody>`;

    const tBody = table.querySelector('tbody');
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML =
            `
        <th scope="row">${user.id}</th>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        `;
        tBody.appendChild(row);
    });

    const colContainer = document.querySelector('#colContainer');
    colContainer.appendChild(table);
}
let filterBy = 'name';

async function filterUsers(query) {
    const users = await getUsers();
    container.innerHTML = "";
    const filteredUsers = users.filter(user => user[filterBy].toLowerCase().includes(query.toLowerCase()));
    displayUsers(filteredUsers);
}

document.querySelectorAll('#dropdown-item').forEach(item => {
    item.addEventListener('click', function () {
        filterBy = this.getAttribute('data-filter');
    });
});

document.querySelector('.btn-search').addEventListener('click,', function () {
    const query = document.querySelector('.search-input').value;
    if(quesry) {
        filterUsers(query);
    }
});