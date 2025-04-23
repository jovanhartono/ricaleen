import { siteConfig } from "@/lib/siteconfig";
import { CheckIcon, MailIcon, PhoneIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function ContactPage() {
  const t = await getTranslations("Contact");
  return (
    <main>
      <section className="relative flex h-[450px] bg-brand py-12 max-sm:items-center sm:h-[600px]">
        <div className="relative z-20 container">
          <div className="flex flex-col space-y-9 sm:w-1/2">
            <h1 className="mr-6 font-normal text-background">
              <strong className="font-medium sm:text-6xl">
                {t("title")}
                <br />
              </strong>
              <span className="text-balance text-background/80 sm:text-5xl">
                {t("title_extended")}
              </span>
            </h1>

            <div className="flex gap-6 text-brand-foreground">
              <div className="flex items-center gap-2">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-brand">
                  <CheckIcon className="size-3.5" />
                </div>
                {t("checklist_first")}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-brand">
                  <CheckIcon className="size-3.5" />
                </div>
                {t("checklist_second")}
              </div>
            </div>

            <ul className="flex flex-col space-y-3 font-medium">
              <li>
                <a
                  href={siteConfig.links.whatsapp}
                  className="flex items-center gap-x-2 text-background"
                >
                  <PhoneIcon className="size-4" />
                  +62 813 – 3886 – 3434
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ricaleen.id"
                  className="flex items-center gap-x-2 text-background"
                >
                  <MailIcon className="size-4" /> info@ricaleen.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="absolute top-0 right-0 bottom-0 left-0 z-10 bg-foreground/60 sm:left-1/2 sm:bg-foreground/10" />
        <Image
          width={600}
          height={600}
          src="https://yd1jimsuwvzgnhbn.public.blob.vercel-storage.com/metal-background-2-VfoG2JEhbzM54jdGLC9rEuQzzpsykR.jpg"
          alt="copper wire"
          className="absolute top-0 right-0 bottom-0 h-full object-cover object-center sm:left-1/2 sm:w-1/2"
        />
      </section>

      <section className="container grid gap-6 py-6 sm:grid-cols-2 sm:py-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d657.1422422922808!2d112.72977117354726!3d-7.393508844286843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e4637f8c8ffb%3A0x27e405b2d43e3279!2sPergudangan%20Gedangan%20Permai!5e0!3m2!1sen!2sid!4v1744541133784!5m2!1sen!2sid"
          className="aspect-square max-h-[550px] w-full rounded-xl border-0 max-sm:order-2"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="sm:py-6">
          <p className="text-xl font-semibold text-brand">
            {t("our_location")}
          </p>
          <h2 className="text-pretty">{t("location_heading")}</h2>

          <dl className="mt-3 space-y-3 sm:mt-12">
            <dt className="text-lg font-semibold tracking-tighter text-brand">
              Headquarters
            </dt>
            <dd className="space-y-2">
              <p>PT Ricaleen Persada Jaya</p>
              <p>A11 & A17, Pergudangan Gedangan Permai </p>
              <p>Sidoarjo, Jawa Timur</p>
              <p>Indonesia</p>
            </dd>
          </dl>
        </div>
      </section>
    </main>
  );
}
