import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div
    // className="mt-6 md:mt-16"
    >
      {/* <div className="grid grid-cols-2 gap-4 ">
        <div>Text</div>
        <div>Video</div>
      </div> */}
      <div className="grid grid-cols-1 gap-y-12 lg:items-center lg:grid-cols-2 xl:grid-cols-2">
        <div className="text-center xl:col-span-1 lg:text-left md:px-16 lg:px-0 xl:pr-20">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
            An editor that helps you create forms in seconds.
          </h1>
          <p className="mt-2 text-lg text-gray-600 sm:mt-6 font-inter">
            Unleash the power of seamless form creation. Customize, Share, and
            Analyze like never before.
          </p>

          <Link
            to="/login"
            className="inline-flex px-8 py-4 mt-8 text-lg font-bold text-white transition-all duration-200 bg-black border border-transparent rounded-md sm:mt-10 hover:bg-gray-900"
          >
            Try our free editor
          </Link>
        </div>

        <div className="xl:col-span-1">
          <iframe
            className="w-full h-[200px] md:h-[350px] shadow-lg rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
            // src="https://www.youtube.com/embed/fea5OljJcls"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};
