import { Client } from "@notionhq/client";

const getTask=async()=>{
    const notion = new Client({
        auth: "secret_76fJvgcfwP6gFCDhlj5UzOKxyYBvnWFwGNMMfJgTfrN",
    });
    const databaseId = "39d028f4665a4162b8916313c1611d38";
    const pageId = "74d7f164037342c880e592d4f8d59131";
    const bloqueId = "abb814fc-6995-440e-b190-8bfb8907a7db";
    const response = await notion.pages.retrieve({ page_id: pageId });
    const newId = response.properties.Módulo.relation[0].id;
    const response2 = await notion.pages.retrieve({ page_id: newId });
    const task = {
        taskName: response.properties.Projects.title[0].plain_text,
        employeeName: response.properties.Product_Manager.people[0].name,
        moduleName: response2.properties.Projects.title[0].plain_text,
        taskPhase: response.properties.Status.select.name,
    } ;
    return task;
}

export default getTask

/*    

    const notion = new Client({
    auth: "secret_76fJvgcfwP6gFCDhlj5UzOKxyYBvnWFwGNMMfJgTfrN",
    });
    const getTask = async (pageId) => {
    const response = await notion.pages.retrieve({ page_id: pageId });
    const newId = response.properties.Módulo.relation[0].id;
    const response2 = await notion.pages.retrieve({ page_id: newId });
    const task = {
        nombreTask: response.properties.Projects.title[0].plain_text,
        nombreTrabajador: response.properties.Product_Manager.people[0].name,
        nombreModulo: response2.properties.Projects.title[0].plain_text,
        faseTask: response.properties.Status.select.name,
    } ;
    return task;
    };

    const databaseId = "39d028f4665a4162b8916313c1611d38";
    const pageId = "74d7f164037342c880e592d4f8d59131";
    const bloqueId = "abb814fc-6995-440e-b190-8bfb8907a7db";

(async () => {
    const data = await getTask(pageId);
    console.log("Result:");
    console.log(data);
})();

*/