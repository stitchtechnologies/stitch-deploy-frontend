import { useRouter } from "next/router"

export default function OrganizationOnboarding() {
    const router = useRouter()
    const { organizationId } = router.query

    return (
        <div>
            <footer className="flex gap-10 text-sm font-normal">
                <div>Privacy Policy</div>
                <div>Documentation</div>
                <div>Legal</div>
                <div>Pricing</div>
                <div>Help</div>
            </footer>
        </div>
    )
}