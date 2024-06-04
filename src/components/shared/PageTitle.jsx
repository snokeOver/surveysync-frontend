const PageTitle = ({ title }) => {
  return (
    <div className="flex justify-center mb-7">
      <h2 className="text-center text-2xl md:text-3xl lg:text-4xl border-y border-dashed border-primary w-fit py-2 lg:py-3 px-2 md:px-5">
        {title}
      </h2>
    </div>
  );
};

export default PageTitle;
