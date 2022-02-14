import { Client } from "@notionhq/client";
const notion = new Client({
    auth: "secret_76fJvgcfwP6gFCDhlj5UzOKxyYBvnWFwGNMMfJgTfrN",
});


const getAllTasks=async()=>{
    
    const databaseId = "39d028f4665a4162b8916313c1611d38";
    const databaseId2 = "eb31a17f1c2f4566be65d475b35b5bee";
    const pageId = "74d7f164037342c880e592d4f8d59131";
    const bloqueId = "abb814fc-6995-440e-b190-8bfb8907a7db";
    try{
        //console.log('iniciando')
        const data = await getProjects(databaseId2);
        //console.log('proyectos listos')
        const data2 = await getTaskId(databaseId);
        //console.log('tareas listas')
        var taskModuleProj:any = [];
        //console.log("Result:");
        data.map((proyecto) => {
        proyecto.projectRelations.map((task:any) => {
        data2.forEach((element:any) => {
        element.forEach((id:any) => {
            if (task.id === id.taskId) {
                taskModuleProj.push({
                    proyectName: proyecto.projectName,
                    moduleName: id.moduleName,
                    taskName: id.taskName,
                    taskId: id.taskId,
                    taskComplete: id.taskComplete,
                    employeeName:id.employeeName,
            });
            }
            });
        });
      /* if (task.id === data2.forEach) */
    });
  });
    console.log('desde task')
    //console.log(taskModuleProj);
    return taskModuleProj;
    }catch(error){
        console.log('error')
    }
}
export default getAllTasks



const getProjects = async (databaseId2:any) => {
  const Proyectos:any = [];
  const response = await notion.databases.query({
    database_id: databaseId2,
  });
  response.results.map((proyecto) => {
    Proyectos.push({
      projectName: proyecto.properties.Name.title[0].plain_text,
      projectRelations:
        proyecto.properties["Related to Proyectos (Proyecto)"].relation,
    });
  });
  return Proyectos;
};


const getModuleName = async (moduleId:any) => {
  const response = await notion.pages.retrieve({ page_id: moduleId });
  const moduleName = response.properties.Projects.title[0].plain_text;
  /* console.log('ModuleName: ', moduleName); */
  return await moduleName;
};

const getTaskId = async (databaseId:any) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: { property: "Type", select: { equals: "Task 🔨" } },
  });
  const fetchData = response.results.map(async (task) => {
    var allTasks = [];
    let moduleName = "";
    const res = task.properties.Módulo.relation;
    if (typeof res[0] === "object") {
      moduleName = await getModuleName(res[0].id);
      allTasks.push({
        moduleName: moduleName,
        taskName: task.properties.Projects.title[0].plain_text,
        taskId: task.id,
        taskComplete: task.properties.Terminado.checkbox,
        employeeName: task.properties.Product_Manager.people[0].name,
      });
      return allTasks;
    } else {
      allTasks.push({
        moduleName: "No definido",
        taskName: task.properties.Projects.title[0].plain_text,
        taskId: task.id,
        taskComplete: task.properties.Terminado.checkbox,
      });
      return allTasks;
    }
  });
  return Promise.all(fetchData);
};