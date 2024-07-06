import Appbar from "@/components/Appbar";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div >
        <Appbar/>
            {children}
    </div>
  );
}


