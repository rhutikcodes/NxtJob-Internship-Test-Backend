import fs from "fs";

export const deleteFile = (path:string)=> {    
    try {
        fs.promises.unlink(path)
            .then(()=>console.log(`File at path ${path} deleted successfully.`))
            .catch(err=>{
                if (err.code === 'ENOENT') {
                    console.log(`File at path ${path} does not exist.`);
                } else {
                    throw err;
                }
            });    
    } catch (error) {        
        throw error;
    }
}