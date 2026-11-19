// IC22 – COSC 2328 – Professor McCurry
// Implemented by: Dorian Braun

/*
1) What is the difference between db.all() and db.get()? When would you use each?
   - db.all() executes a SELECT query and returns every matching row as a JavaScript array of objects (using plural `rows`). You use it when you expect multiple records, such as rendering a full table, list, or directory of items.
   - db.get() executes a SELECT query and returns only a single JavaScript object for the first matching row (using singular `row`), or `undefined` if nothing matches. You use it when looking up a single unique record, such as fetching details for a specific item by its unique ID.

2) A classmate writes 'SELECT * FROM students WHERE id = ' + id in a route handler. What is wrong with this, and what would happen if someone sent the value 1; DROP TABLE students as the ID?
   - This approach is vulnerable to SQL injection because it concatenates raw user input directly into the SQL string. 
   - If someone sent `1; DROP TABLE students`, the query would execute as two separate SQL statements: first selecting the student where `id = 1`, and second executing `DROP TABLE students`, which would permanently delete the entire `students` table from the database.

3) The db.get callback uses a parameter named row (singular) while db.all uses rows (plural). Why is this naming convention meaningful?
   - It is meaningful because it accurately reflects the data type returned by each method: `db.all()` always returns an array collection (hence the plural `rows`), whereas `db.get()` returns a single discrete record object (hence the singular `row`).

4) Visiting /ic22/students/2 and /ic22/students/7 both work from a single route definition — router.get('/students/:id', ...). How does Express handle that?
   - Express handles this using path parameters. The `:id` segment acts as a dynamic placeholder variable, capturing whatever value is passed in that part of the URL path and making it accessible inside the handler via `req.params.id`.
*/

async function loadStudents() {
    const response = await fetch('/ic22/students');
    const students = await response.json();

    const list = document.getElementById('student-list');
    list.innerHTML = '';

    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.first_name} ${student.last_name} - ${student.classification}, ${student.major}`;
        list.appendChild(li);
    });

}

document.getElementById('lookup-btn').addEventListener('click', async () => {
    const id = document.getElementById('student-id').value;
    const result = document.getElementById('student-result');

    const response = await fetch(`/ic22/students/${id}`);
    const student = await response.json();

    if (student.message) {
        result.textContent = student.message;
    } else {
        result.textContent = `${student.first_name} ${student.last_name} - ${student.classification}, ${student.major}`;
    }
});

loadStudents();


