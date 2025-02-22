"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import LogoSVG from "@/app/components/svg/LogoSVG";
import {
  Activity,
  ChevronDown,
  Flash,
  Lock,
  Scale,
  Server,
  TagUser,
} from "@/app/components/svg/UISVG";
import { signOut, useSession } from "next-auth/react";
import Language from "@/app/components/Language";
import { useTranslations } from "next-intl";
import { Paths } from "@/paths";

export function LogoComponent() {
  return (
    <Link href={Paths.home}>
      <NavbarBrand>
        <LogoSVG />
        <p className="font-bold text-inherit">Tún</p>
      </NavbarBrand>
    </Link>
  );
}

export default function HeroNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const t = useTranslations();

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <LogoComponent />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <LogoComponent />
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                {t("ui.nav.features.title")}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-full"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="tinh_tien_dien"
              description={t("ui.nav.electric.description")}
              startContent={icons.flash}
              as={Link}
              href={Paths.electric}
            >
              {t("ui.nav.electric.title")}
            </DropdownItem>
            <DropdownItem
              key="autoscaling"
              textValue="autoscaling"
              description="ACME scales apps to meet user demand, automagically, based on load."
              startContent={icons.scale}
            >
              Autoscaling
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              textValue="usage_metrics"
              description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
              startContent={icons.activity}
            >
              Usage Metrics
            </DropdownItem>

            <DropdownItem
              key="99_uptime"
              textValue="99_uptime"
              description="Applications stay on the grid with high availability and high uptime guarantees."
              startContent={icons.server}
            >
              +99% Uptime
            </DropdownItem>
            <DropdownItem
              key="supreme_support"
              textValue="supreme_support"
              description="Overcome any challenge with a supporting team ready to respond."
              startContent={icons.user}
            >
              +Supreme Support
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {session && session.user ? (
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={session.user.name || "null"} // Hiển thị tên người dùng từ localStorage
                  size="sm"
                  src={session.user.image || "null"}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  textValue="profile"
                  className="h-14 gap-2"
                >
                  <p className="font-semibold">
                    Signed in as {session.user.name}
                  </p>
                  <p className="font-semibold">Email: {session.user.email}</p>{" "}
                </DropdownItem>
                <DropdownItem key="settings" textValue="settings">
                  My Settings
                </DropdownItem>
                <DropdownItem
                  key="signout"
                  textValue="signout"
                  color="danger"
                  onPress={() => signOut()}
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden sm:flex">
              <Link href={Paths.signin}>{t("ui.nav.signin.title")}</Link>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <Button
                as={Link}
                color="warning"
                href={Paths.signup}
                variant="flat"
              >
                {t("ui.nav.signup.title")}
              </Button>
            </NavbarItem>
          </>
        )}

        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Language />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link className="w-full" href={Paths.home}>
            {t("ui.nav.home.title")}
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full" href={Paths.electric}>
            {t("ui.nav.electric.title")}
          </Link>
        </NavbarMenuItem>
        {session && session.user ? (
          <NavbarMenuItem>
            <Link
              className="w-full text-red-500"
              href="#"
              onClick={() => signOut()}
            >
              {t("ui.nav.signout.title")}
            </Link>
          </NavbarMenuItem>
        ) : (
          <>
            <NavbarMenuItem>
              <Link className="w-full" href={Paths.signin}>
                {t("ui.nav.signin.title")}
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link className="w-full" href={Paths.signup}>
                {t("ui.nav.signup.title")}
              </Link>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
