// don't forget to remove comments
//```dataviewjs
const currentFilePath = dv.current().file.path;
const currentFileName = dv.current().file.name;

const folderPath = currentFilePath.substring(0, currentFilePath.lastIndexOf('/'));

const pages = dv.pages(`"${folderPath}"`);

const folders = new Map();
const files = [];

pages.forEach(page => {
    if (page.file.name !== currentFileName) {
        if (page.file.folder === folderPath) {
            files.push(page.file.name);
        } else if (page.file.folder.startsWith(folderPath) && page.file.folder !== folderPath) {
            const folder = page.file.folder;
            if (!folders.has(folder)) {
                folders.set(folder, []);
            }
            folders.get(folder).push(page.file.name);
        }
    }
});

dv.header(2, "Files:");
// how to add this to graph -_-
if (files.length > 0) {
    dv.list(files.map(file => `[[${file}]]`));
} else {
    dv.paragraph("None.");
}

// and this -_-
const sortedFolders = Array.from(folders.keys()).sort();
if (sortedFolders.length > 0) {
    sortedFolders.forEach(folder => {
        dv.header(3, folder.replace(`${folderPath}/`, ''));
        const folderFiles = folders.get(folder);
        if (folderFiles.length > 0) {
            dv.list(folderFiles.map(file => `[[${file}]]`));
        } else {
            dv.paragraph("None.");
        }
    });
} else {
    dv.header(3, "Dirs:");
    dv.paragraph("None.");
}
//```
