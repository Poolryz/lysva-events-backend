const urls={
    localhost: "mongodb://localhost:27017/lysva-events",
    public: "mongodb+srv://savinovdanil:120698daOKLICKMQVGYJkb@cluster0.g1ybj.mongodb.net/lysva-events?retryWrites=true&w=majority&appName=Cluster0"
}


function urlChanger(){
    let dev = true
    if (dev){
        return urls.localhost
    }
else{
    return urls.public
}

}

export default urlChanger