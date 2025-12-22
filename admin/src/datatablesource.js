export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "username",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img||"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "city",
    headerName: "city",
    width: 100,
  },
  {
    field: "phonoNo",
    headerName: "PhonoNo",
    width: 100,
  },
  {
    field: "country",
    headerName: "Country",
    width: 100,
  }
  ];
  export const hotelsColumns = [
    { field: "_id", headerName: "ID", width:250 },
    
    {
      field: "name",
      headerName: "Name",
      width: 230,
    },
  
    {
      field: "Type",
      headerName: "Type",
      width: 100,
    },
    {
      field: "title",
      headerName: "Title",
      width: 100,
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
    }
    ];
    export const eventsColumns = [
      { field: "_id", headerName: "ID", width: 250 },
      
      {
        field: "title",
        headerName: "title",
        width: 230,
      },
    
      {
        field: "price",
        headerName: "Price",
        width: 100,
      },
      {
        field: "maxPeople",
        headerName: "MaxPeople",
        width: 100,
      },
      {
        field: "desc",
        headerName: "Descripation",
        width: 200,
      }
      ];
      