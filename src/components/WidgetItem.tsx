interface Props {
  totalPrice?: number;
  title?: string;
  children: React.ReactNode;
}

export const WidgetItem = ({ totalPrice, title, children }: Props) => {
  return (
    <div className="md:col-span-2 lg:col-span-1">
      <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col items-center gap-2">
          {title && (
            <span className="text-3xl font-bold underline">{title}</span>
          )}
          {children ? (
            children
          ) : (
            <>
              <h5 className="text-xl text-gray-600 text-center">Price</h5>
              <div className="mt-2 flex justify-center gap-4">
                <h3 className="text-3xl font-bold text-gray-700">
                  ${totalPrice}
                </h3>
              </div>
              <span className="block text-center text-gray-500">Taxes 15%</span>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
