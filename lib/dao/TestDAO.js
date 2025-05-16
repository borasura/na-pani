// test-taskdao.js


//import { getAttentionNeededTasks, getAttentionNeededTasksByUserId } from "./TaskDAOAlt";
const { TaskDAOAlt } = require('./TaskDAOAlt');

//dotenv.config({ path: ".env" }); // Use your dev DB, or change to .env.test
const harvey_id = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
const suits_projectid = '9a7b1c2d-3e4f-5061-7283-94a5b6c7d8e9'

async function run() {
  try {
    
    const tasksForProject = TaskDAOAlt.getAttentionNeededTasks(suits_projectid);
    console.log(tasksForProject)
    
    // const tasksForUser = await getAttentionNeededTasksByUserId(harvey_id);
    // console.log(tasksForUser)

  } catch (err) {
    console.error("❌ Error running test:", err);
  } finally {
    // await prisma.tasks.deleteMany();
    // await prisma.user.deleteMany();
    // await prisma.$disconnect();
  }
}

run();
