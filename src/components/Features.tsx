export const Features = () => {
  const features = [
    {
      title: "Drag and drop fields",
      description: "Some descp",
      path: "/drag-and-drop.MOV",
    },
  ];

  return (
    <div className="py-10">
      <p className="text-3xl font-bold text-center">Features</p>
      <div className="py-20">
        {features?.map?.((item: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-y-12 lg:items-center lg:grid-cols-2 xl:grid-cols-2"
          >
            <div className=" xl:col-span-1">
              <p>{item?.title}</p>
              <p>{item?.description}</p>
            </div>
            <div className="xl:col-span-1">
              <video
                src={item?.path}
                autoPlay
                loop
                muted
                className="shadow-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
