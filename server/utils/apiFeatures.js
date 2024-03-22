class ApiFeatures {
    constructor(query, queryStr){
        this.query = query
        this.queryStr = queryStr
    }

    search(){
        let keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options : 'i'
            }
        } : {}

        this.query.find({...keyword})
        return this
    }


    filter(){
        //Get all fields from query
        let queryItems = {...this.queryStr}

        //Giving unwanted string to array
        const unWantedQueryArr = ["keyword", "limit", "page"]

        //Removing unwanted strings from querItems object
        unWantedQueryArr.forEach(field => delete queryItems[field])

        let queryPriceStr = JSON.stringify(queryItems)

        queryPriceStr = queryPriceStr.replace(/\b(gt|gte|lt|lte)/g, (match) => `$${match}`)

        //console.log(queryPriceStr)

        this.query.find(JSON.parse(queryPriceStr))

        return this
    }
    pagination(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1

        const skip = resPerPage * ( currentPage - 1 )

        this.query.limit(resPerPage).skip(skip)

        return this
    }
}

module.exports = {
    ApiFeatures
}