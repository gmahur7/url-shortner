import mongoose,{Document,Model,Schema} from 'mongoose'

interface IUrl extends Document {
    url:string;
    shortId:string;
    visits:IVisits[]
}

interface IVisits {
    time:number
}

const urlSchema:Schema<IUrl> = new Schema({
    url:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    shortId:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    visits:[{
        time:{
            type:Number,
            default:Date.now()
        }
    }]
},{
    timestamps:true
}
)

const Url = (mongoose.models.shorturl as Model<IUrl>) || mongoose.model<IUrl>('shorturl',urlSchema)

export default Url;